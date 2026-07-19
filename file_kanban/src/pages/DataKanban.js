function DataKanban() {
	const dom = new DOMParser().parseFromString(`
		<section id="kanban">
			<div>data kanban</div>
		</section>	
	`, "text/html").body.firstChild;

	return dom;
}