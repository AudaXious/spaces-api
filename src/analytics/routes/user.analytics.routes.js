import { Router } from "express";
import { getGlobalLeaderShipBoardData, getTotalNumberOfUser } from "../controllers/user.analytics.controller.js";

const routes = Router();

routes.get("/leaderboard", getGlobalLeaderShipBoardData);
//
routes.get("/totalUsers", getTotalNumberOfUser);
//

export default routes;
