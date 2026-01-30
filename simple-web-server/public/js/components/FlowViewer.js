import fetchView from "@utils/fetchView.js";
import InputNode from "./InputNode.js";
import FlowEditor from './FlowEditor.js';
import data from '../../data.js';

const createFlow = async (data) => {
  if (!data) return [];

  // 階層リストを昇順で作成
  const stepList = [...new Set(data.map(x => x.step))].sort();

  const createStepContainer = (stepNum) => {
    const stepContainer = document.createElement('div');
    stepContainer.classList.add('step-container');
    stepContainer.dataset.step = stepNum;
    return stepContainer;
  }

  // add btn
  const createAddInputNode = () => {
    const addInputNode = document.createElement('button');
    addInputNode.textContent = '⊕';
    addInputNode.classList.add('input-node-add');
    addInputNode.onclick = async (event) => {
      const parent = event.target.closest('.step-container');
      const stepNum = parent.dataset.step;
      const newItem = {
        id: Math.max(...data.map(x => x.id)) + 1
        , step: stepNum
      }
      data.push(newItem);
      const inputNode = await InputNode(data, newItem);
      addInputNode.before(createAddInputNode());
      addInputNode.before(inputNode)
    }
    return addInputNode;
  }

  // step ごとに data をフィルタ
  // step コンテナに node を追加
  const stepContainerList = [];
  for (const stepNum of stepList) {
    const stepContainer = createStepContainer(stepNum);
    const filtered = data.filter(x => x.step == stepNum);
    filtered.sort((a, b) => parseInt(a.row) - parseInt(b.row));

    for( const itemData of filtered) {
      const addInputNode = createAddInputNode();
      stepContainer.append(addInputNode);
      const inputNode = await InputNode(data, itemData);
      stepContainer.append(inputNode);
    }

    // 一番下のaddボタン
    const addInputNode = createAddInputNode();
    stepContainer.append(addInputNode);
    stepContainerList.push(stepContainer);
  }

  // 最後のステップコンテナ
  const maxStep = Math.max(...stepList) + 1;
  const addInputNode = createAddInputNode();
  addInputNode.classList.add('last-step');
  addInputNode.textContent = '入力フィールドを追加する';
  addInputNode.onclick = async (event) => {
    const stepContainer = event.target.closest('.step-container');
    const stepNum = stepContainer.dataset.step;
    stepContainer.dataset.step = stepNum + 1;

    const maxId = Math.max(...data.map(x => x.id)) + 1;
    const newItem = {
      id: maxId
      , step: stepNum
      , title: ''
      , type: ''
      , content: []
    };

    const newStep = createStepContainer(stepNum);
    newStep.append(createAddInputNode());
    newStep.append(await InputNode(data, newItem));
    newStep.append(createAddInputNode());

    stepContainer.before(newStep);
  }
  const lastStep = createStepContainer(maxStep);
  lastStep.append(addInputNode);
  stepContainerList.push(lastStep);

  return stepContainerList;
}

const FlowViewer = async () => {
  const flowViewer = await fetchView('FlowViewer');
  const flowEditor = await FlowEditor();

  flowViewer.append(flowEditor);
  const [nodemap] = flowViewer.getElementsByClassName('nodemap');

  // data に基づいて flow を表示
  const stepContainerList = await createFlow(data);
  nodemap.append(...stepContainerList);

  return flowViewer;
};

export default FlowViewer;