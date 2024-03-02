const environment = process.env.NODE_ENV || "development";

const check =
  environment === "production"
    ? "production"
    : environment === "staging"
    ? "staging"
    : "development";

const CONFIG = {
  development: {
    MONGODB_URI : process.env.MONGODB_URI,
    CLIENT_JWT_SECRET: process.env.CLIENT_JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    EMAIL_APIKEY: process.env.EMAIL_APIKEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    HOST_ADDRESS : process.env.HOST_ADDRESS,
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CLIENT_ROUTE : process.env.CLIENT_ROUTE,
  },
  production: {
    MONGODB_URI : process.env.MONGODB_URI_PROD,
    CLIENT_JWT_SECRET: process.env.CLIENT_JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER_PROD,
    EMAIL_HOST: process.env.EMAIL_HOST_PROD,
    EMAIL_PASS: process.env.EMAIL_PASS_PROD,
    EMAIL_SENDER: process.env.EMAIL_SENDER_PROD,
    EMAIL_APIKEY: process.env.EMAIL_APIKEY_PROD,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD_PROD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL_PROD,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID_PROD,
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET_PROD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    HOST_ADDRESS: process.env.HOST_ADDRESS_PROD,
    CLIENT_ROUTE: process.env.CLIENT_ROUTE_PROD,
  },
};

export default CONFIG[check];
