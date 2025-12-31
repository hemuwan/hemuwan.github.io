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
  const contentBox = await fetchView('ContentBox');
  const header = await Header();
  contentBox.prepend(header);

  const render = async () => {
    const hash = location.hash || '#Home';
    const route = routes[hash] ?? Home
    const component = await route();

    const [main] = contentBox.getElementsByTagName('main');

    // 中身をごっそり引数のものと入れ替える。
    main.replaceChildren(component);

    component.animate(
      {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0)"]
      },
      { duration: 200 }
    )

    // render を定義していれば実行する。
    component.render && component.render();
  }

  // await render(contentBox); // 最初のDOMに接続前だとうまく行かない。

  return [contentBox, render];
}

export default ContentBox