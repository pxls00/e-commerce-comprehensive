CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customer (
  uuid uuid DEFAULT uuid_generate_v1 (),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(255),
  surname VARCHAR(255),
  age INTEGER,
  PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS token(
  uuid uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
  customer_uuid uuid UNIQUE REFERENCES customer(uuid),
  refresh_token TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
  uuid uuid DEFAULT uuid_generate_v1 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER
);