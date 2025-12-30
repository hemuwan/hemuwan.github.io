import fetchView from "@utils/fetchView.js";
import Header from "./Header.js";
import Home from "@pages/Home.js"
import DraggableSpace from "./DraggableSpace.js";

const routes = {
  '': Home
  , '#Home': Home
  , '#DraggableSpace': DraggableSpace
}

const ContentBox = async () => {

  const render = async (contentBox) => {
    const hash = location.hash || '#Home';
    const route = routes[hash] ?? Home
    const component = await route();

    const [main] = contentBox.getElementsByTagName('main');
    
    // 中身をごっそり引数のものと入れ替える。
    main.replaceChildren(component);
  }

  const contentBox = await fetchView('ContentBox');
  const header = await Header();
  contentBox.prepend(header);

  await render(contentBox);

  return [contentBox, render];
}

export default ContentBox