function createDom(text) {
	const dom = new DOMParser().parseFromString(text, "text/html").body.firstChild;
	return dom;
}