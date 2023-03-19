import Pages from "../model/pages.js";
import Feeds from "../model/feeds.js";
import getPosts from "../libs/getPosts.js";
import postsToXML from "../libs/postsToXML.js";
import fetchPageInfo from "../libs/fetchPageInfo.js";

export async function fetchFeed(req, res) {
	const page = await Pages.get(req.params.key);

	if (!page) return res.send(404);

	let feeds = await Feeds.get(page.key);

	if (feeds) {
		feeds = feeds.value;
	} else {
		feeds = await getPosts(page);
		await Feeds.add(page.key, feeds);
	}

	const { format, bclr = "FFF", clr = "000" } = req.query;

	if (!format) {
		res.json(feeds);
	} else if (format === "xml") {
		res.set("Content-Type", "text/xml");
		res.send(postsToXML(feeds));
	} else if (format === "html") {
		const locals = { bclr, clr, feeds, page };
		res.render("widget", { locals });
	} else {
		res.sendStatus(500);
		res.json({ error: "unknown type" });
	}
}

export async function addPage(req, res) {
	const page = req.body;
	
	if(!page.name) return res.json({ error: "name parameter required" });
	else if(!page.url) return res.json({ error: "url parameter required" });
	else if(!page.title || !page.content) return res.json({ error: "title or content parameter required" });
	else if(!page.container) return res.json({ error: "container parameter required" });

	let key;

	try {
		({ key } = await Pages.add(page));
	} catch(err) {
		res.json({ error: err.toString() });
		return;
	}

	return res.json({ key });
}

export async function checkPage(req, res) {
	const { url } = req.query;

	if(!url) return res.json({ err: "Url parameter required!" });

	fetchPageInfo(url)
		.then(pageIfno => res.json(pageIfno))
		.catch(err => res.json({ error: err.toString() }));
}
