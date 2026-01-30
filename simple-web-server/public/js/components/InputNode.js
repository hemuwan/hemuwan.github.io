import fetchView from '@utils/fetchView.js';

const InputNode = async (data, itemData) => {
  const inputNode = await fetchView('InputNode');

  // 使えないデータが入ってはならない。
  if (!itemData.id) throw new Error("不正なitemdata", itemData);

  // dataset を使うほうが良いかも
  inputNode.id = itemData.id ?? '';
  inputNode.step = itemData.step ?? '';
  inputNode.row = itemData.row ?? '';

  // node 削除
  const [deleteBtn] = inputNode.getElementsByClassName('input-node-delete');
  deleteBtn.onclick = (event) => {
    const stepContainer = event.target.closest('.step-container');
    const nodeList = stepContainer.querySelectorAll('.InputNode');

    if (nodeList.length <= 1) {
      stepContainer.remove();
    } else {
      const addBtn = inputNode.previousElementSibling;
      addBtn.remove();
      inputNode.remove();
    }
  }

  const title = inputNode.querySelector(':scope > .header > .title');
  title.textContent = itemData.title ?? 'new node';

  // node が持つ選択肢を右のコンテナに列挙
  const outContainer = inputNode.querySelector(':scope > .body > .out-container');
  itemData.content && itemData.content.forEach(content => {
    const outItem = document.createElement('div');
    outItem.classList.add('out-item');
    outItem.textContent = content.label;
    const address = [
      'from', itemData.id
      , 'to', content.next_id
      , 'item', content.label 
    ].join('-');
    outItem.setAttribute(address, '');
    outContainer.append(outItem);
  });

  // 現在の node が next_id に指定されている選択肢を抽出、左のコンテナへ
  const inContainer = inputNode.querySelector(':scope > .body > .in-container');
  const beforeStepData = data ? data.filter(x => x.step < parseInt(itemData.step)) : [];
  beforeStepData.forEach(x => {
    x.content && x.content.forEach(y => {
      if (y.next_id == itemData.id) {
        const inItem = document.createElement('div');
        inItem.classList.add('in-item');
        inItem.textContent = y.label;
        const address = [
          'from', x.id
          , 'to', y.next_id
          , 'item', y.label 
        ].join('-')
        inItem.setAttribute(address, '');
        inContainer.append(inItem);
      }
    });
  });

  return inputNode;
}

export default InputNode;