import { Router } from "express";
import { fetchFeed, checkPage, addPage } from "../controller/apiController.js";

const apiRouter = new Router();

apiRouter.get("/feeds/:key", fetchFeed);
apiRouter.get("/check-page", checkPage);
apiRouter.post("/add-page", addPage);

export default apiRouter;
