import { Router } from "express";
import { getGlobalLeaderShipBoardData } from "../controllers/user.analytics.controller.js";

const routes = Router();

routes.get("/leaderboard", getGlobalLeaderShipBoardData);
//

export default routes;
