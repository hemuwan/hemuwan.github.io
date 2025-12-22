// 入力フィールドのコンテナと空白用のコンテナを作成
const updateInputContainer = (data) => {
  // const data = manager.value;
  const viewer = document.querySelector('.flowViewer');
  // 既存の step, path を削除
  [...viewer.getElementsByClassName('stepContainer')].forEach(x => x.remove());

  // stepを取り出し、照準ソート、重複を削除
  // stepごとにinputContainerを追加していく
  const stepList = [...new Set(data.map(x => x.step))];
  // 最後に追加ボタン飲みのステップを入れる
  const maxStepNum = Math.max(...stepList) + 1;
  stepList.push(maxStepNum);
  stepList.sort().forEach(stepNum => {
    const filtered = data.filter(x => x.step === stepNum);
    
    if (filtered.length <= 0 && stepNum != maxStepNum) return;

    // col_numでソート
    filtered.sort((a, b) => a.col_num - b.col_num);

    const step = document.createElement('div');
    step.className = 'stepContainer';
    step.setAttribute('step', stepNum);

    // 追加ボタンの作成
    const addInputContainerBtn = document.createElement('button');
    addInputContainerBtn.className = 'addInputContainerBtn';
    addInputContainerBtn.textContent = '＋';

    filtered.forEach((inputData, i) => {
      if (i === 0) {
        // 最初のstepには前にも追加ボタンをつける
        step.append(addInputContainerBtn);
      }
      step.innerHTML += setInputContainer(inputData);
      step.append(addInputContainerBtn);
    });

    // 最後の空 step に追加ボタンを入れる。
    if (stepNum == maxStepNum) {
      addInputContainerBtn.classList.add('lastAddBtn');
      addInputContainerBtn.textContent = '入力フィールドを追加する';
      step.append(addInputContainerBtn)
    }

    viewer.querySelector('.wrapper').append(step);
  });

  updatePath(data);
}