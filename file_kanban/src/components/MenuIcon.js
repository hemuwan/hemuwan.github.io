if (document.getElementById("style").textContent.indexOf(".menu_icon") < 0) {
	document.getElementById("style").textContent = document.getElementById("style").textContent + `
		.menu_icon {
			cursor: pointer;
			width: 30px;
			height: 30px;
			background-color: transparent;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin: auto 8px;
			padding: 8px;

			>.menu_line {
				width: 32px;
				height: 4px;
				background-color: rgb(102 102 102);
			}
		}

	`;
}

function MenuIcon () {
  const dom = new DOMParser().parseFromString(`
		<div class="menu_icon" onclick="menuIconClick()">
			<div class="menu_line"></div>
			<div class="menu_line"></div>
			<div class="menu_line"></div>
		</div>
  `, "text/html").body.firstChild;

  return dom;
}

function menuIconClick(event) {
  const [slideMenu] = document.getElementsByClassName("slide_menu");
  if (!slideMenu) {
    return;
  }
  if (slideMenu.classList.contains("open")) {
    slideMenu.classList.remove("open")
  } else {
    slideMenu.classList.add("open")
  }
}