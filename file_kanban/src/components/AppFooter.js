appendStyle("app_footer", `
	.app_footer {
		background-color: #caffee;
	}
`);

function AppFooter() {
	const dom = new DOMParser().parseFromString(`
		<footer class="app_footer">
			<div>footer</div>
  		</footer>
	`, "text/html").body.firstChild;

	return dom;
}