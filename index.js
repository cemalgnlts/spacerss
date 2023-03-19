import "./libs/envParser.js";

import express from "express";
import es6Renderer from "express-es6-template-engine";

import feedsRouter from "./routes/feedsRouter.js";
import apiRouter from "./routes/apiRouter.js";

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.static("./public"));
app.engine("html", es6Renderer);
app.set("view engine", "html");
app.set("views", "./views");
app.use(express.json());

app.use("/feeds", feedsRouter);
app.use("/api", apiRouter);

app.use("/info", (req, res) => {
	res.render("template", {
		locals: {
			title: "Info | SpaceRSS",
			activeTabIndex: 2
		},
		partials: { partial: "info" }
	});
});

app.use("/", (req, res) => {
	res.render("template", {
		locals: {
			title: "SpaceRSS",
			activeTabIndex: 0
		},
		partials: { partial: "index" }
	});
});

app.use("*", (req, res) => {
	res.redirect("/");
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
