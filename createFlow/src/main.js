// wrapper, pathmap の配置
const app = document.getElementById('app');
app.innerHTML = parseDOM(app.innerHTML); // 余計な空白を削除

// dataManager 生成、状態管理
// const managedData = dataManager([]);
// const managedData = dataManager(sampleData);
let managedData = sampleData;

// イベント移譲で動的に増減する要素にイベント追加
app.getElementsByClassName('wrapper')[0].onclick = (event) => {
  const {target} = event;
  const {classList} = target;
  // 親に向かって探索
  const inputContainer = target.closest('.inputContainer');

  if (classList.contains('addInputContainerBtn')) {
    addInputContainer(target);
  } else if (classList.contains('inputContainerDeleteBtn')) {
    removeInputContainer(target);
  } else if (inputContainer) {
    viewInputEditor(inputContainer);
  }
};

app.getElementsByClassName('flowEditorBody')[0].onclick = (event) => {
  const {target} = event;
  const {classList} = target;

  if (classList.contains('addSelectItemBtn')) {
    addSelectItem(target, managedData);
  } else if (classList.contains('removeSelectItemBtn')) {
    removeSelectItem(target);
  }
};

// 初期表示
updateInputContainer(managedData);
// ウィンドウリサイズ時にパスを更新
window.addEventListener('resize', () => updatePathmap(managedData));