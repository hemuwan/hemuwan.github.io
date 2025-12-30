import "@components/MyChild.js";
import "@components/MyElement.js";

import Sidebar from "@components/Sidebar.js";
import ContentBox from "./js/components/ContentBox.js";

const app = document.getElementById('app');
const sidebar = await Sidebar();
const [contentBox, render] = await ContentBox();

app.append(sidebar, contentBox);

window.addEventListener('hashchange', () => render(contentBox));