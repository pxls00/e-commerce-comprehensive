CREATE TABLE product (
  uuid uuid DEFAULT uuid_generate_v1 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER
);