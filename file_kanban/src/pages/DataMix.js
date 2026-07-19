function DataMix() {
	const dom = new DOMParser().parseFromString(`
		<section id="mix">
			<div>data mix</div>
		</section>	
	`, "text/html").body.firstChild;

	return dom;
}