import { Router } from "express";
import { feedsIndexPage, feedInfoPage } from "../controller/feedsController.js";

const feedsRouter = new Router();

feedsRouter.get("/", feedsIndexPage);
feedsRouter.get("/:key", feedInfoPage);

export default feedsRouter;
