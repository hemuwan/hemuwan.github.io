appendStyle("user_information", `
	.user_information {
		margin-left: auto;
	}
`)

function UserInformation() {
	const dom = new DOMParser().parseFromString(`
		<div class="user_information">
			user
		</div>
	`, "text/html").body.firstChild;

	return dom;
}