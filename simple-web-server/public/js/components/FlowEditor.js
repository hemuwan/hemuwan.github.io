import fetchView from "@utils/fetchView.js";

const FlowEditor = async () => {
  const flowEditor = await fetchView('FlowEditor');

  const [closeBtn] = flowEditor.getElementsByClassName('close-btn');
  closeBtn.onclick = () => flowEditor.classList.toggle('close');

  return flowEditor;
}

export default FlowEditor;