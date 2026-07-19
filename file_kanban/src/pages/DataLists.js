function DataLists() {
	const table = createTable(headerData, taskListData);
	const dom = createDom(`
		<section id="lists">
			<div>datalists</div>
			${table.outerHTML}
		</section>
	`);
	return dom;
}

function createTable(head, body) {
	// tbody 単体は DOMparser ではうまく作れない。table ごと作る必要がある。
	const table = createDom(`
		<table>
			<thead onclick="onclickForTd(event)">
				<tr>
					${head.map(data => {
						return `<th data-key="${data.key}">${data.label}</th>`
					}).join("")}
				</tr>
			</thead>
			<tbody>
				${body.map(task => {
					return `<tr>${head.map(data => {
						return `<td data-key="${data.key}">${task[data.key]}</td>`
					}).join("")}</tr>`
				}).join("")}
			</tbody>
		</table>
	`);

	return table;
}

function onclickForTd(event) {
	const { target } = event;
	if (target.tagName === "TH") {
		const { key } = target.dataset;
		if (!key) {
			return;
		}

		taskListData.sort((a, b) => {
			const val_a = a[key];
			const val_b = b[key];
			if (key.indexOf("Date") >= 0) {
				return new Date(val_a) - new Date(val_b);
			} else if (val_a != null && Number(val_a)) {
				return Number(val_a) - Number(val_b);
			} else if (typeof val_a === "string") {
				return String(val_a).localeCompare(String(val_b), "ja");
			}
			return 0;
		});

		render(headerData, taskListData);
	}
}

function render(head, body) {
	const new_table = createTable(head, body);
	const current_table = document.querySelector("table");
	current_table.replaceWith(new_table);
}