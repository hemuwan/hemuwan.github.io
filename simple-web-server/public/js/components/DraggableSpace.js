import fetchView from "@utils/fetchView.js";

let g_dragging_element = null;

const resetAll = () => {
  document.querySelectorAll('.padding').forEach(x => x.remove());
  // row が空であれば row を削除
  document.querySelectorAll('.row').forEach(x => x.children.length === 0 && e.remove());
}

const setupRow = (elm) => {
  const setupPanel = (elm) => {
    if (elm.draggable) return;
    // elm.ondrag = () => undefined;
    elm.ondragstart = (e) => g_dragging_element = e.target;
    elm.ondragend = (e) => g_dragging_element = null;
    elm.draggable = true;
  }

  const panels = elm.querySelectorAll(':scope > .panel'); // elm 直下の .panel のみ。孫までは見ない
  for (const panel of panels) {
    elm.insertBefore(createPadding(), panel);
    setupPanel(panel);
  }
  elm.append(createPadding());
}

const setupRoot = (elm) => {
  const rows = elm.querySelectorAll(':scope > .row');
  for (const row of rows) {
    elm.insertBefore(createPadding(), row);
    setupRow(row);
  }
  elm.append(createPadding());
}

const movePanel = (panel, destination) => {
  const destParent = destination.parentElement;
  if (destParent.classList.contains('row')) {
    destParent.insertBefore(panel, destination);
  } else {
    const newRow = createRow();
    destParent.insertBefore(newRow, destination);
    newRow.append(panel);
  }

  resetAll();
  setupAll();
}

const createRow = () => {
  const div = document.createElement('div');
  div.classList.add('row');
  return div;
}

const createPadding = () => {
  const div = document.createElement('div');
  div.classList.add('padding');
  div.ondragstart = () => div.classList.add('active');
  div.ondragleave = () => div.classList.remove('active');
  div.ondragover = (e) => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  };
  div.ondrop = (e) => {
    e.preventDefault();
    if (!g_dragging_element) return;

    const panel = g_dragging_element;
    movePanel(panel, e.target);
  };
  return div;
}

const DraggableSpace = async () => {
  const DraggableSpace = await fetchView('DraggableSpace');

  setupRoot(DraggableSpace);

  return DraggableSpace;
}

export default DraggableSpace;