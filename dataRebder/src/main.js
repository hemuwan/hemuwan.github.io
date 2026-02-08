// 表敬式のデータとそれに基づく画面描画について、
// それぞれの責任を分離して、わかりやすく変更もしやすいものを目指す。

// components

const Controller = (store, renderer) => {
  const contorller = document.createElement('div');

  const undo = document.createElement('button');
  undo.textContent = '戻る'
  undo.classList.add('undo')
  undo.disabled = true;
  undo.onclick = () => {
    const stepList = store.undo();
    renderer(stepList);
  }
  contorller.append(undo);

  const redo = document.createElement('button');
  redo.textContent = '進む';
  redo.classList.add('redo');
  redo.disabled = true;
  redo.onclick = () => {
    const stepList = store.redo();
    renderer(stepList);
  }
  contorller.append(redo);

  return contorller;
}

// 横に並べる要素
const Node = (info, prop) => {

  // node 追加ボタン
  const AddButton = (prop) => {
    const button = document.createElement('button');
    button.textContent = '⊕';
    button.classList.add('node-add');

    const getIndexes = (step, node) => {
      const stepIndex = [...document.getElementsByClassName('step-container')].indexOf(step);
      const nodeIndex = [...step.getElementsByClassName('node')].indexOf(node);
      return [stepIndex, nodeIndex];
    }
    
    // button をクリックしたら data の該当箇所に node を追加して ref を更新
    button.onclick = (e) => {
      const {target} = e
      const step = target.closest('.step-container');
      const node = target.closest('.node');
      const [stepIndex, nodeIndex] = getIndexes(step, node);
      
      const stepList = prop.store.addNode({stepIndex, nodeIndex});
      prop.onchange(stepList);
    }

    return button;
  }

  // ノード削除ボタン
  const RemoveButton = (prop) => {
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.classList.add('node-remove');
    btn.onclick = (event) => {
      const step = event.target.closest('.step-container');
      const node = event.target.closest('.node');
      const stepIndex = [...document.getElementsByClassName('step-container')].indexOf(step);
      const nodeIndex = [...step.getElementsByClassName('node')].indexOf(node);
      // データを更新して、renderer を呼び出す
      const stepList = prop.store.removeNode({stepIndex, nodeIndex});
      prop.onchange(stepList);
    }
    return btn;
  }

  // node main
  const node = document.createElement('span');
  node.classList.add('node');
  node.dataset.id = info.id;
  node.dataset.title = info.title;
  node.textContent = info.title;
  node.append(AddButton(prop));
  node.append(RemoveButton(prop));
  node.append(AddButton(prop));

  return node;
}

// 縦に積んでいく要素
const StepContainer = (nodeList, prop) => {
  const step = document.createElement('div');
  step.classList.add('step-container');
  nodeList.forEach(nodeInfo => {
    const node = Node(nodeInfo, prop)
  });
  return step;
}

// data に基づいて画面描画
const render = (target, store) => {
  const nodemap = target;

  const renderer = (stepList) => {
    
    const prop = {
      store
      , onchange: (data) => renderer(data) // データ更新イベントハンドラ
    }

    // 差分更新
    const stepContainerList = target.getElementsByClassName('step-container');

    // 多ければ間引く
    for (let i = stepContainerList.length; i > stepList.length; i--) {
      stepContainerList[i - 1].remove();
    }

    stepList.forEach((nodeList, index) => {
      let stepContainer = stepContainerList[index];
      // 存在しなければ作成
      if (!stepContainer) {
        stepContainer = StepContainer(nodeList, prop);
        target.append(stepContainer);
      }

      const nodeElements = stepContainer.getElementsByClassName('node');

      // node が多ければ間引く
      for (let i = nodeElements.length; i > nodeList.length; i--) {
        nodeElements[i - 1].remove();
      }

      nodeList.forEach((nodeInfo, nodeIndex) => {
        let node = nodeElements[nodeIndex];

        // 存在しなければ再作成
        if(!node) {
          
          node = Node(nodeInfo, prop);
          stepContainer.append(node);
        }

        // data が異なれば再作成
        if (node.dataset.id != nodeInfo.id || node.dataset.title != nodeInfo.title) {
          const newNode = Node(nodeInfo, prop)
          node.replaceWith(newNode);
        }
      })
    })
  }

  // 最初の描画
  // renderer(store.value);

  return renderer;
}

const store = (init) => {
  // node のデータテンプレート
  const nodeOrg = {
    id: 1
    , title: ''
    , type: {
      id: 1
      , label: 'テキスト'
    } 
    , items: []
  }
  // データの初期化、なければnode込のstepを１つ追加
  let stepList = init || [[nodeOrg]];
  // 現在のdataの最大idを取得
  const maxId = () => {
    const max = Math.max(
      ...stepList
        .flat()
        .map(node => node.id)
    );
    return isNaN(parseInt(max)) ? 1 : max; 
  };
  // 新しいnodeのデータを生成、newData にない値は org の値になる。
  const newNode = (newData) => {
    const id = maxId() + 1;
    // .assign の第１引数も変わってしまう。
    const temp = Object.assign(JSON.parse(JSON.stringify(nodeOrg)), {id, title: `title ${id}`});
    return Object.assign(temp, newData);
  }

  // history
  let dataHistory = [structuredClone(stepList)];
  let historyIndex = 0;
  const maxHistory = 10;
  
  // 更新があれば配列にためていく unshift
  // undo が押されれば、index をカウントし、一つ前の要素へ
  // その状態から更新されると、前の要素は残し、あとの要素は消して、新しいデータを入れる。カウントを戻す
  const addHistory = (data) => {
    dataHistory = dataHistory.slice(historyIndex);
    historyIndex = 0;
    dataHistory.unshift(JSON.parse(JSON.stringify(data)));
    // 上限10
    if (dataHistory.length >= maxHistory) {
      dataHistory = dataHistory.slice(0, maxHistory);
    }
    document.querySelector('.redo').disabled = true;
    document.querySelector('.undo').disabled = false;
  }

  return {
    get value () {
      return stepList;
    }
    , set value (v) {
      stepList = v;
    }
    , get history() {
      return [dataHistory, historyIndex];
    }
    , addStep: (stepIndex) => {
      stepList = stepList.toSplice(stepIndex + 1, 0, newNode({}));
      addHistory(stepList);
      return stepList;
    }
    , addNode: ({stepIndex, nodeIndex}) => {
      stepList[stepIndex].splice(nodeIndex + 1, 0, newNode({}));
      addHistory(stepList);
      return stepList;
    }
    , updateNode: (stepIndex, nodeIndex, newNode) => {
      if (!stepList[stepIndex] || !stepList[stepIndex]?.[nodeIndex]) {
        console.log('not found')
      }
      stepList[stepIndex][nodeIndex] = newNode;
      return stepList;
    }
    , removeNode: ({stepIndex, nodeIndex}) => {
      stepList[stepIndex].splice(nodeIndex, 1);
      // step が空になったら step ごと削除
      if (stepList[stepIndex].length === 0) {
        stepList.splice(stepIndex, 1);
      }
      addHistory(stepList);
      return stepList;
    }
    , undo: () => {
      historyIndex = historyIndex + 1;
      if (historyIndex >= maxHistory - 1) {
        // 履歴が10こ貯まったらボタンを押せないように
        historyIndex = maxHistory - 1;
        document.querySelector('.undo').disabled = true;
      } else if (dataHistory.length <= historyIndex + 1) {
        // 履歴の数にindexが追いついたらボタンを押せないように
        document.querySelector('.undo').disabled = true;
      }
      document.querySelector('.redo').disabled = false;
      stepList = structuredClone(dataHistory[historyIndex]);
      return stepList;
    }
    , redo: () => {
      historyIndex = historyIndex - 1;
      if (historyIndex <= 0) {
        historyIndex = 0;
        document.querySelector('.redo').disabled = true;
      }
      document.querySelector('.undo').disabled = false;
      stepList = structuredClone(dataHistory[historyIndex]);
      return stepList;
    }
  }
}

// main

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

// store 登録
const stored = store(data);

const app = document.getElementById('app');

// 描画領域
const nodemap = document.createElement('div');
app.append(nodemap);

const renderer = render(nodemap, stored);
const stepList = stored.value;
renderer(stepList); // 最初の描画

// redo, undo ボタン
const contorller = Controller(stored, renderer);
app.append(contorller);

