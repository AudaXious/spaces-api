import "dotenv/config"
import express from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error.middleware.js";
import clientRoutes from "./api/api.js";
import { InitializePassport } from "./api/middlewares/social-auth/auth.social.js";
import passport from "passport";
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import CONFIG from "./config/default.js"
import upload from "./api/middlewares/multer/multer.middleware.js";
import analyticsRoutes from "./analytics/analytics.js"

const app = express();

const MongoDBStore = connectMongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: CONFIG.MONGODB_URI,
  collection: 'sessions',
})

app.use(
    session({
      name : "spaces-svr",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      maxAge: 24 * 60 * 60 * 1000,
      proxy: process.env.NODE_ENV === 'production' ? true : false,
      store: sessionStore,
      cookie:{
        sameSite : 'None',
        secure : process.env.NODE_ENV === 'production' ? true : false,
        // httpOnly : process.env.NODE_ENV === 'production' ? true : false,
      }
    })
  );
  
app.options("*", cors());
app.use(cors({
  // origin: ['https://www.audaxious.com', 'http://localhost:8080'],
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize())
app.use(passport.session());


app.get("/", async (_, res)=>{

    return res.status(200).json({
        success : true,
        message : "API is live and running"
    });
})

//Initialize passport middleware 
InitializePassport(CONFIG.OAUTH_CLIENT_ID, CONFIG.OAUTH_CLIENT_SECRET);

app.use(upload);
app.use("/api/v1", clientRoutes);
app.use("/api/analytics", analyticsRoutes)

//404 middleware for routes that does not exists on the server
app.use(err404NotFound)

export default app;