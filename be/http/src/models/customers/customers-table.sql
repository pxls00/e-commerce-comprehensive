CREATE TABLE customer (
  uuid uuid DEFAULT uuid_generate_v1 (),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(255),
  surname VARCHAR(255),
  age INTEGER,
  PRIMARY KEY (uuid)
);