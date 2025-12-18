// 入力フィールドのコンテナと空白用のコンテナを作成
const updateInputContainer = (manager) => {
  const data = manager.value;
  const viewer = document.querySelector('.flowViewer');
  // 既存の step, path を削除
  [...viewer.getElementsByClassName('stepContainer')].forEach(x => x.remove());

  // stepを取り出し、照準ソート、重複を削除
  // stepごとにinputContainerを追加していく
  [...new Set(data.map(x => x.step))].sort().forEach(stepNum => {
    const filtered = data.filter(x => x.step === stepNum);
    if (filtered.length <= 0) return;

    const step = document.createElement('div');
    step.className = 'stepContainer';
    step.setAttribute('step', stepNum);
    filtered.forEach(inputData => step.innerHTML += setInputContainer(inputData));

    viewer.querySelector('.wrapper').append(step);
  });

  updatePath(data);
}