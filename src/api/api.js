import express from "express";
import authRoutes from "./routes/auth.routes.js";
import {authorizeUser} from "../api/middlewares/auth.middleware.js"
import socialAuthRoutes from "./routes/auth.social.routes.js";
import spaceRoutes from "./routes/spaces.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import twitterRoutes from "./routes/twitter.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(socialAuthRoutes)
app.use('/user', authRoutes)
app.use(authorizeUser);
app.use('/twitter', twitterRoutes )
app.use('/spaces', spaceRoutes)
app.use('/profile', profileRoutes)
app.use('/campaign', campaignRoutes)
app.use('/task', taskRoutes)

export default app;