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
    CLOUD_NAME : process.env.CLOUD_NAME,
    CLOUD_API_KEY : process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET : process.env.CLOUD_API_SECRET
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
    CLOUD_NAME : process.env.CLOUD_NAME_PROD,
    CLOUD_API_KEY : process.env.CLOUD_API_KEY_PROD,
    CLOUD_API_SECRET : process.env.CLOUD_API_SECRET_PROD,
  },
  staging: {
    MONGODB_URI : process.env.MONGODB_URI_STAGING,
    CLIENT_JWT_SECRET: process.env.CLIENT_JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER_STAGING,
    EMAIL_HOST: process.env.EMAIL_HOST_STAGING,
    EMAIL_PASS: process.env.EMAIL_PASS_STAGING,
    EMAIL_SENDER: process.env.EMAIL_SENDER_STAGING,
    EMAIL_APIKEY: process.env.EMAIL_APIKEY_STAGING,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD_STAGING,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL_STAGING,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID_STAGING,
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET_STAGING,
    SESSION_SECRET: process.env.SESSION_SECRET,
    HOST_ADDRESS: process.env.HOST_ADDRESS_STAGING,
    CLIENT_ROUTE: process.env.CLIENT_ROUTE_STAGING,
    CLOUD_NAME : process.env.CLOUD_NAME_STAGING,
    CLOUD_API_KEY : process.env.CLOUD_API_KEY_STAGING,
    CLOUD_API_SECRET : process.env.CLOUD_API_SECRET_STAGING,
  },
};

export default CONFIG[check];
