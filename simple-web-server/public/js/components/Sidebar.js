import fetchView from '@utils/fetchView.js';

const Sidebar = async () => {
  const sidebar = await fetchView('Sidebar');

  // dom へ要素やイベントを追加
  const ul = sidebar.querySelector(':scope ul');

  const hashList = [
    "Home"
    , "Dashboard"
    , "DraggableSpace"
  ]

  const maped = hashList.map(x => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + x;
    a.textContent = x;
    li.append(a);
    return li;
  })

  ul.append(...maped);

  return sidebar;
}

export default Sidebar;