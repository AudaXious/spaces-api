import express from "express";
import authRoutes from "./routes/auth.routes.js";
import {authorizeUser} from "../api/middlewares/auth.middleware.js"
import socialAuthRoutes from "./routes/auth.social.routes.js";

const app = express();

app.use(socialAuthRoutes)
app.use('/user', authRoutes)
app.use(authorizeUser);

export default app;