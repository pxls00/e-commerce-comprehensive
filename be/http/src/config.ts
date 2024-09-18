export default {
  PORT: process.env.PORT || 3000,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || "postgres",
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || "access_key",
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || "refresh_key",
}