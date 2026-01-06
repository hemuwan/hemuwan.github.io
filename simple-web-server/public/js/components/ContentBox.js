import fetchView from "@utils/fetchView.js";
import Header from "./Header.js";

let contentBox;

const ContentBox = async () => {
  contentBox = await fetchView('ContentBox');
  const header = await Header();
  contentBox.prepend(header);

  // await render(contentBox); // 最初のDOMに接続前だとうまく行かない。

  return contentBox;
}

const render = async (routes) => {
  if(!contentBox) return;
  
  const hash = location.hash?.replace('#', '') || 'Home';
  const route = routes[hash] ?? Object.values(routes)[0];
  if (!route) return;
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

// default をつけられるのは１つだけ
export {ContentBox, render}