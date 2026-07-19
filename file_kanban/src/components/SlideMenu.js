if (document.head.querySelector("style[data-key=slide_menu]") == null ) {
	const style = document.createElement("style");
	style.dataset.key = "slide_menu";
	style.textContent =  `
		.slide_menu {
			width: 0px;
			transition: width 0.2s 0s;
			overflow: hidden;

			&.open {
				width: 20vw
			}

			>ul {
				width: 20vw
			}
		}
	`;
	document.head.append(style);
}

function SlideMenu() {
	const menus = [
		{label: "リスト", key: "lists"},
		{label: "カンバン", key: "kanban"},
		{label: "ガントチャート", key: "gantchart"},
		{label: "全て", key: "mix"},
	];
	const dom = new DOMParser().parseFromString(`
		<aside class="slide_menu" onclick="slideMeneOnClick(event)">
			<div>
				menu${MenuIcon().outerHTML}
			</div>
			<ul>
				${menus.map(x => `<li data-key="${x.key}">${x.label}</li>`).join("")}
			</ul>
		</aside>	
	`, "text/html").body.firstChild;

	return dom;
}

function slideMeneOnClick(event) {
	const {target} = event;

	console.log(target);
	if (target.tagName === "LI") {
		console.log(target.dataset.key);
		const { key } = target.dataset;
		if (!key) {
			return;
		}
		location.hash = `/${key}`;
	}
}