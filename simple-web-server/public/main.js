// import "@components/MyChild.js";
// import "@components/MyElement.js";

import Sidebar from "@components/Sidebar.js";
import ContentBox from "@components/ContentBox.js";

const app = document.getElementById('app');
const sidebar = await Sidebar();
const [contentBox, render] = await ContentBox();

app.append(sidebar, contentBox);
render(); // DOM接続後 append したあとに実行。

window.addEventListener('hashchange', render);