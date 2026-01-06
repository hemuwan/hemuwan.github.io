// import "@components/MyChild.js";
// import "@components/MyElement.js";

import Home from "@pages/Home.js";
import DraggableSpace from "@components/DraggableSpace.js";
import FlowViewer from "@components/FlowViewer.js";

import Sidebar from "@components/Sidebar.js";
import {ContentBox, render} from "@components/ContentBox.js";

const app = document.getElementById('app');

const routes = {
  Home
  , DraggableSpace
  , FlowViewer
}

const sidebar = await Sidebar(routes);
const contentBox = await ContentBox();

app.append(sidebar, contentBox);
render(routes); // DOM接続後 append したあとに実行。

window.addEventListener('hashchange', () => render(routes));