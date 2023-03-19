initTabs();
initCreateFeedDialog();
initOutAnimations();

function initTabs() {
	const tabsContainer = document.querySelector(".tabs");
	if (!tabsContainer) return;

	const tabs = Array.from(tabsContainer.children);
	tabs.shift(); // remove visual tab.
	const defaultTabIndex = tabs.indexOf(tabsContainer.querySelector("[aria-current='page']"));

	tabs.forEach((tab, index) => {
		let animate = true;

		tab.onmouseenter = () => animate && tabsContainer.style.setProperty("--hover-index", index);
		tab.onmouseleave = () => animate && tabsContainer.style.setProperty("--hover-index", defaultTabIndex);

		tab.onclick = () => {
			animate = false;
			document.body.classList.replace("anim-slide-in", "anim-slide-out");
		}
	});
}

function initCreateFeedDialog() {
	const createFeedDialog = document.querySelector(".create-feed-dialog");
	if (!createFeedDialog) return;

	const createFeedDialogContent = document.querySelector(".create-feed-dialog__content");
	const dialogClose = document.querySelector(".create-feed-dialog__close");
	const createFeed = document.querySelector("#create-feed");
	const checkPageBtn = document.querySelector("#check-page");
	const pageInfoBtn = document.querySelector("#info-page");
	const addPageBtn = document.querySelector("#add-page");
	let page = {};

	createFeed.onclick = ev => {
		ev.preventDefault();
		page = {};

		createFeedDialog.style.display = "flex";
		createFeedDialogContent.classList.add("anim-slide-in");
	};

	dialogClose.onclick = () => {
		createFeedDialogContent.classList.replace("anim-slide-in", "anim-slide-out");
		createFeedDialogContent.onanimationend = () => {
			createFeedDialog.style.display = "";
			createFeedDialogContent.className = "create-feed-dialog__content step--url";
			createFeedDialogContent.onanimationend = null;
		};
	};

	checkPageBtn.onclick = async () => {
		const inpUrl = document.querySelector("#inp-url");
		const url = inpUrl.value.trim();

		if (!url) {
			inpUrl.focus();
			return;
		}

		checkPageBtn.disabled = true;
		let res = null;

		try {
			const req = await fetch(`/api/check-page?url=${url}`);
			res = await req.json();
		} catch (err) {
			console.error(err);
			return;
		} finally {
			checkPageBtn.disabled = false;
		}

		page.url = url;

		const iconImgEl = document.querySelector(".create-feed-dialog__info__img");
		const inpPageIcon = document.querySelector("#inp-page-icon");
		const inpPageTitle = document.querySelector("#inp-page-title");
		const inpPageDesc = document.querySelector("#inp-page-desc");

		iconImgEl.src = res.icon;
		inpPageIcon.value = res.icon;
		inpPageTitle.value = res.name;
		inpPageDesc.value = res.description;

		inpPageIcon.onblur = () => iconImgEl.src = inpPageIcon.value;

		createFeedDialogContent.classList.replace("step--url", "step--info");

		pageInfoBtn.onclick = () => {
			page.name = inpPageTitle.value;
			page.icon = inpPageIcon.value;
			page.description = inpPageDesc.value;

			createFeedDialogContent.classList.replace("step--info", "step--meta");
		}
	};

	addPageBtn.onclick = async () => {
		addPageBtn.disabled = true;

		const inpFeedContainer = document.querySelector("#inp-feed-container");
		const inpFeedTitle = document.querySelector("#inp-feed-title");
		const inpFeedContent = document.querySelector("#inp-feed-content");
		const inpFeedLink = document.querySelector("#inp-feed-link");
		const inpFeedImage = document.querySelector("#inp-feed-image");

		page.container = inpFeedContainer.value.trim();
		page.title = inpFeedTitle.value.trim();
		page.content = inpFeedContent.value.trim();
		page.link = inpFeedLink.value.trim();
		page.image = inpFeedImage.value.trim();

		const req = await fetch("/api/add-page", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(page)
		});

		if (!req.ok) {
			addPageBtn.disabled = false;
			alert("Network error!");
			return;
		}

		const res = await req.json();

		if (res.error) {
			addPageBtn.disabled = false;
			alert(res.error);
			return;
		}

		createFeedDialogContent.classList.replace("anim-slide-in", "anim-slide-out");
		setTimeout(() => location.pathname = `/feeds/${res.key}`, 250);
	}
}

function initOutAnimations() {
	const backLinks = document.querySelectorAll("#back-to-feeds,.feeds-grid__anchor");
	if (backLinks.length === 0) return;

	backLinks.forEach(link => link.onclick = () => document.body.classList.replace("anim-slide-in", "anim-slide-out"));
}