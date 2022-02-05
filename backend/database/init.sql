-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    username VARCHAR(16) UNIQUE,
    salt VARCHAR(128),
    password VARCHAR(128), -- sha512 produces 128bit hex number
    session_key VARCHAR(32) UNIQUE,
    key_expire TIMESTAMP
);
