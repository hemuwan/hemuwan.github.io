function appendStyle(key, style) {
	if (document.head.querySelector(`style[data-key=${key}]`)) {
		return
	}
	const addstyle = document.createElement("style");
	addstyle.dataset.key = key;
	addstyle.textContent = style;
	document.head.append(addstyle);
}