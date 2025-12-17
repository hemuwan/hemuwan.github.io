// 入力フィールドのコンテナと空白用のコンテナを作成
const updateInputContainer = (managedData) => {
  const data = managedData.value;
  // 既存の step, path を削除
  [...document.getElementsByClassName('stepContainer')].forEach(x => x.remove());

  // stepを取り出し、照準ソート、重複を削除
  // stepごとにinputContainerを追加していく
  [...new Set(data.map(x => x.step))].sort().forEach(stepNum => {
    const filtered = data.filter(x => x.step === stepNum);
    if (filtered.length <= 0) return;

    const step = document.createElement('div');
    step.className = 'stepContainer';
    step.setAttribute('step', stepNum);
    filtered.forEach(inputData => step.innerHTML += setInputContainer(inputData));

    document.getElementById('flow').querySelector('.wrapper').append(step);
  });

  updatePath(data);

  // イベントデリゲート、hiddenに値が入るように  
  // [...document.getElementsByClassName('step')].forEach(x => {
  //   x.oninput = (event) => {
  //     const target = event.target; 
  //     if (target.tagName === 'INPUT') {
  //       const input_id = target.getAttribute('input_id');
  //       const hidden = document.querySelector(`input[type="hidden"][input_id="${input_id}"]`)
  //       hidden.setAttribute('next_input_id', target.getAttribute('next_input_id'));
  //       hidden.setAttribute('value', target.value);
  //     } else if (target.tagName === 'SELECT') {
  //       const selectOption = target.options[target.selectedIndex];
  //       const input_id = selectOption.getAttribute('input_id')
  //       const hidden = document.querySelector(`input[type="hidden"][input_id="${input_id}"]`)
  //       hidden.setAttribute('next_input_id', selectOption.getAttribute('next_input_id'));
  //       hidden.setAttribute('value', selectOption.getAttribute('value'));
  //     }
  //     updatePath();
  //   }
  // });
}