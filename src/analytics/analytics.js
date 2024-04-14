import express from "express";
// import {authorizeUser} from "../api/middlewares/auth.middleware.js"
import spaceAnalyticsRoutes from "./routes/space.analytics.routes.js"
import userGlobalPointsAnalyticsRoutes from "./routes/user.analytics.routes.js"
const app = express();

app.use("/spaceAnalytics",spaceAnalyticsRoutes);
app.use("/globalUserPointsAnalytics", userGlobalPointsAnalyticsRoutes)
// app.use(authorizeUser);

export default app;