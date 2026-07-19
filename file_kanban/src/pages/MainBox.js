if (document.getElementById("style").textContent.indexOf(".main_box") < 0) {
	document.getElementById("style").append(`
		.main_box {
			height: 100vh;
			width: 100vw;
			display: flex;
			flex-direction: column;
			
			.main_content {
				height: 100%;
				padding: 8px;
			}
		}
	`);
}

function MainBox() {
	const dom = new DOMParser().parseFromString(`
		<main class="main_box">
			${AppHeader().outerHTML}
			<div class="main_content"></div>
			${AppFooter().outerHTML}
		</main>
	`, "text/html").body.firstChild;
	
	return dom;
}