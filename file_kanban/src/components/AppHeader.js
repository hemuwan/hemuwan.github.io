appendStyle("app_header", `
	.app_header {
		background-color: #caffee;
		display: flex;

		>.app_title {
			padding: 0 8px;
			color: #8d8d8d;
			margin: 4px 0;
		}
	}
`);

function AppHeader() {
	const dom = createDom(`
		<header class="app_header">
			${MenuIcon().outerHTML}
			<h2 class="app_title">JSON to kanban</h2>
			${UserInformation().outerHTML}
    	</header>
	`);

	return dom;
}