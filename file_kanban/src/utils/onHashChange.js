function onHashChange() {
	const pages = {
		lists: DataLists,
		kanban: DataKanban,
		gantchart: DataGantchart,
		mix: DataMix
	}
	const key = location.hash.split("/")[1] || "lists";

	if (!key) {
		console.log("none hash", key)
		return;
	}
	const nextPage = pages[key];
	if (!nextPage) {
		console.log("none target page", key, nextPage);
		return;
	}

	const currentPage = document.querySelector(".main_content section");
	if (!currentPage) {
		nextPageAnimation(nextPage());
		return;
	}

	if (currentPage.id == key) {
		return;
	}

	const animation = currentPage.animate([
		{opacity: "1", transform: "translateX(0px)"},
		{opacity: "0", transform: "translateX(10px)"}
	],
	{
		duration: 200,
		iterations: 1
	})
	
	animation.onfinish = () => {
		currentPage.remove();
		nextPageAnimation(nextPage());
	}
}

function nextPageAnimation(nextElm) {
	document.querySelector(".main_content").append(nextElm);
	nextElm.animate([
		{opacity: "0", transform: "translateX(-10px)"},
		{opacity: "1", transform: "translateX(0px)"},
	],
	{
		duration: 200,
		iterations: 1
	})
}