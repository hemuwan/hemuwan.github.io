document.getElementById("app").append(
	SlideMenu(),
	MainBox()
);

window.addEventListener("hashchange", onHashChange);
onHashChange();