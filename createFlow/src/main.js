// wrapper, pathmap の配置
const app = document.getElementById('app');
app.innerHTML = parseDOM(app.innerHTML); // 余計な空白を削除

// dataManager 生成、状態管理
// const managedData = dataManager([]);
// const managedData = dataManager(sampleData);
let managedData = sampleData;

// イベント移譲で動的に増減する要素にイベント追加
app.getElementsByClassName('wrapper')[0].onclick = (event) => {
  const target = event.target;
  if (target.classList.contains('addInputContainerBtn')) {
    addInputContainer(target);
  } else if (target.classList.contains('inputContainerDeleteBtn')) {
    removeInputContainer(target);
  } else if (target.classList.contains('inputContainer')) {
    viewInputEditor
  }
}

updateInputContainer(managedData);
window.addEventListener('resize', () => updatePath(managedData));