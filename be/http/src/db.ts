import { Pool } from "pg";

import config from "./config";

const pool = new Pool({
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  database: config.DB_NAME
});

const query = async (text: string, params?: any[]) => pool.query(text, params);

export default query;