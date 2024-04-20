import { Router } from "express";
import { getSpaceLeaderShipBoardData } from "../controllers/space.analytics.controller.js";

const routes = Router();

routes.get("/leaderboard/:spaceId", getSpaceLeaderShipBoardData);

export default routes;
