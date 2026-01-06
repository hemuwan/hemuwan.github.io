import fetchView from '@utils/fetchView.js';

const InputNode = async (data, itemData) => {
  const inputNode = await fetchView('InputNode');

  inputNode.setAttribute('node-id', itemData.id ?? '');
  inputNode.setAttribute('step', itemData.step ?? '');
  inputNode.setAttribute('row', itemData.row ?? '');

  const title = inputNode.querySelector(':scope > .header > .title');
  title.textContent = itemData.title ?? 'new node';

  // node が持つ選択肢を右のコンテナに列挙
  const outContainer = inputNode.querySelector(':scope > .body > .out-container');
  itemData.content && itemData.content.forEach(content => {
    const outItem = document.createElement('div');
    outItem.classList.add('out-item');
    outItem.textContent = content.label;
    outItem.setAttribute('next-id', content.next_id);
    outContainer.append(outItem);
  });

  // 現在の node が next_id に指定されている選択肢を抽出、左のコンテナへ
  const inContainer = inputNode.querySelector(':scope > .body > .in-container');
  const beforeStepData = data ? data.filter(x => x.step < parseInt(itemData.step)) : [];
  beforeStepData.forEach(x => {
    x.content.forEach(y => {
      if (y.next_id == itemData.id) {
        const inItem = document.createElement('div');
        inItem.classList.add('in-item');
        inItem.textContent = y.label;
        inItem.setAttribute('from_id', x.id);
        inContainer.append(inItem);
      }
    });
  });

  return inputNode;
}

export default InputNode;