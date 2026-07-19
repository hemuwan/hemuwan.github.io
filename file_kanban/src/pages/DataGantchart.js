function DataGantchart() {
	const dom = new DOMParser().parseFromString(`
		<section id="gantchart">
			<div>data gantchart</div>
		</section>	
	`, "text/html").body.firstChild;

	return dom;
}