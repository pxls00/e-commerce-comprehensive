CREATE TABLE token(
  uuid uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
  customer_uuid uuid UNIQUE REFERENCES customer(uuid),
  refresh_token TEXT NOT NULL
);