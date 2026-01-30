// 表敬式のデータとそれに基づく画面描画について、
// それぞれの責任を分離して、わかりやすく変更もしやすいものを目指す。

const data = [
  [
    {id: 1, title: 'タイトル1'}
  ],
  [
    {id: 2, title: 'タイトル2'}, {id: 3, title: 'タイトル3'}
  ],
  [
    {id: 4, title: 'タイトル4'}, {id: 5, title: 'タイトル5'}, {id: 6, title: 'タイトル6'}
  ]
];

const store = (init) => {
  let data = init;
  const maxId = () => Math.max(...data.map(nodeList => nodeList.map(node => node.id)).flat());
  const createNewNode = () => Object.assign({}, {id: maxId() + 1, title: `タイトル${maxId() + 1}`});
  const createNewStep = () => [createNewNode()];

  return {
    get value () {
      return data;
    }
    , addNewStep: (stepIndex) => data.splice(stepIndex + 1, 0, createNewStep())
    , addNewNode: (stepIndex, nodeIndex) => {
      data[stepIndex].splice(nodeIndex + 1, 0, createNewNode())
    }
    , updateNode: (stepIndex, nodeIndex, newNode) => {
      data[stepIndex][nodeIndex] = newNode;
    }
    , removeNode: (stepIndex, nodeIndex) => {
      data[stepIndex].splice(nodeIndex, 1);
      // step が空になったら step ごと削除
      if (data[stepIndex].length === 0) data.splice(stepIndex, 1);
    }
  }
}

const render = (store, nodemap) => {
  const createStep = () => {
    const step = document.createElement('div');
    step.classList.add('step');
    return step;
  }

  const createNode = () => {
    const node = document.createElement('span');
    node.classList.add('node');
    return node;
  }

  return {
    get nodemap() {
      return nodemap;
    }
    , addNewStep: (stepIndex) => {
      store.addNewStep(stepIndex);
      nodemap.append(createStep());
    }
  }
}

const ref = (init) => {
  let data = init || [[{id: 1, title: 'タイトル1'}]];
  const fn = [];
  return {
    get value() {
      return data;
    }
    , set value(newValue) {
      data = newValue;
      fn.forEach(f => f(data));
    }
    , set onChange(f) {
      fn.push(f);
    }
  }
}

const dataRef = ref([[]]);

const createStep = () => {
  const step = document.createElement('div');
  step.classList.add('step');
  return step;
}

const createNode = (info, ref) => {
  const removeBtn = (ref) => {
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.classList.add('node-remove');
    btn.onclick = (event) => {
      const step = event.target.closest('.step');
      const node = event.target.closest('.node');
      const stepIndex = [...document.getElementsByClassName('step')].indexOf(step);
      const nodeIndex = [...step.getElementsByClassName('node')].indexOf(node);
      const data = ref.value;
      data[stepIndex].splice(nodeIndex, 1);
      ref.value = data;
    }
    return btn;
  }
  const node = document.createElement('span');
  node.classList.add('node');
  node.dataset.id = info.id;
  node.textContent = info.title;
  node.append(removeBtn(ref));
  return node;
}

const nodeAddButton = (ref) => {
  const button = document.createElement('button');
  button.textContent = '⊕';
  button.classList.add('node-add');

  const getIndexes = (step) => {
    const stepIndex = [...document.getElementsByClassName('step')].indexOf(step);
    const nodeIndex = [...step.getElementsByClassName('node')].indexOf(button.previousSibling);
    return [stepIndex, nodeIndex];
  }
  
  // button をクリックしたら data の該当箇所に node を追加して ref を更新
  button.onclick = () => {
    const step = button.closest('.step');
    const [stepIndex, nodeIndex] = getIndexes(step);
    const data = ref.value;
    let newId = Math.max(...data.map(x => x.map(y => y.id)).flat()) + 1;
    if (isNaN(parseInt(newId))) newId = 1;
    const newNodeData = {id: newId, title: `タイトル${newId}`};
    data[stepIndex].splice(nodeIndex + 1, 0, newNodeData);
    ref.value = data;
  }

  return button;
}

const addStepButton = (ref) => {

}

const app = document.getElementById('app');

// ref が更新されたらdataと画面を比較、dataをベースに差異のみを反映
// 追加も削除も更新も対応した処理
dataRef.onChange = (data) => {
  const stepList = document.getElementsByClassName('step');
  for (const i in data) {
    const nodeList = data[i];
    const nodeElements = stepList[i].getElementsByClassName('node');

    if (nodeElements.length > nodeList.length) {
      // nodeElements が多い場合、不要な要素を削除
      for (let j = nodeElements.length - 1; j >= nodeList.length; j--) {
        nodeElements[j].previousSibling.remove(); // add ボタンも削除
        // 消えるアニメーションが終わったら削除
        nodeElements[j].style.pointerEvents = 'none'; // アニメーション中にクリックされないように
        nodeElements[j].style.overflow = 'hidden';
        nodeElements[j].style.display = 'inline-block';
        nodeElements[j].style.whiteSpace = 'nowrap';
        const width = nodeElements[j].offsetWidth + 'px';
        nodeElements[j].style.width = width;
        const animate = nodeElements[j].animate(
          [
            {opacity: 1, width: width},
            {opacity: 0, width: '0px'}
          ], {
            duration: 200,
            fill: 'forwards'
          }
        );
        animate.onfinish = () => {
          stepList[i].removeChild(nodeElements[j]);
        };
      }
    } else if (nodeElements.length < nodeList.length) {
      // nodeElements が少ない場合、不足分を追加
      for (let j = nodeElements.length; j < nodeList.length; j++) {
        const nodeData = nodeList[j];
        const newNode = createNode(nodeData, dataRef);
        const addButton = nodeAddButton(dataRef);
        stepList[i].append(newNode);
        stepList[i].append(addButton);
      }
    }

    // 内容を比較して差分を反映
    for (const j in nodeList) {
      const nodeData = nodeList[j];
      const nodeElement = nodeElements[j];
      if (nodeElement.dataset.id != nodeData.id || nodeElement.textContent != nodeData.title) {
        const newNode = createNode(nodeData, dataRef);
        stepList[i].replaceChild(newNode, nodeElement);
      }
    }    
  }
}

const step = createStep();
step.append(nodeAddButton(dataRef));
app.append(step);

const step_2 = createStep();
step_2.append(nodeAddButton(dataRef));
app.append(step_2);

