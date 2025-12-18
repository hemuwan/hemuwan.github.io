// wrapper, pathmap の配置
const app = document.getElementById('app');
app.innerHTML = parseDOM(`
  <div class='appContent'>
    <div class='appHeader'>
      <h2>Flow Creator</h2>
      <div class='appHeaderControl'>
      </div>
      <div class='appHeaderInformation'>
        <div class='userInformation'>
          User: Hemuwan
        </div>
      </div>
    </div>
    <div class='appBody'>
      <div class='flowViewer'>
        <div class='viewerHeader'>
          <h2>Flow Viewer</h2>
        </div>
        <div class='viewerBody'>
          <svg class='pathmap'></svg>
          <div class='wrapper'></div>
        </div>
      </div>
      <div class='flowEditor'>
        <div class='flowEditorHeader'>
          <h2>Flow Editor</h2>
        </div>
        <div class='flowEditorBody'>
          <button class='addInputContainerbtn'>Add Input Container</button>
        </div>
      </div>
    </div>
  </div>
`);

// dataManager 生成、状態管理
// const managedData = dataManager([]);
const managedData = dataManager(sampleData);


// イベント移譲でaddInputContainerbtnにイベント追加
app.getElementsByClassName('wrapper')[0].onclick = (event) => {
  console.log(event.target);
  const target = event.target;
  if (target.classList.contains('addInputContainerbtn')) {
    const stepContainer = event.target.closest('.stepContainer');
    const step = parseInt(stepContainer.getAttribute('step'));
    const newInputId = 10;// generateId('input', data.map(x => x.input_id));
    const newInputData = {
      input_id: newInputId,
      step: step,
      title: 'New Input',
      type: 'text',
      content: [
        {
          display: 'New Input',
          value: '',
          next_input_id: ''
        }
      ]
    };
    managedData.value.push(newInputData);
    updateInputContainer(managedData);
  };
};

updateInputContainer(managedData);
window.addEventListener('resize', () => updatePath(managedData.value));