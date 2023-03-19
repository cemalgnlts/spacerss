import Pages from "../model/pages.js";

export async function feedsIndexPage(req, res) {
	let feeds = await Pages.getAll();
	feeds = feeds ? feeds.items : [];

	res.render("template", {
		locals: {
			title: "Feeds | SpaceRSS",
			activeTabIndex: 1,
			feeds
		},
		partials: {
			partial: "feeds"
		}
	});
}

export async function feedInfoPage(req, res) {
	const page = await Pages.get(req.params.key);

	if(!page) return res.sendStatus(404);

	res.render("template_noheader", {
		locals: {
			title: `${page.name} | SpaceRSS`,
			page
		},
		partials: {
			partial: "feed"
		}
	});
}
