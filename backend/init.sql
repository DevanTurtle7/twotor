-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS universities, accounts;

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO universities (name) VALUES
('Rochester Institute of Technology');

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    university_id INTEGER REFERENCES universities ON DELETE SET NULL,
    username VARCHAR(16) UNIQUE NOT NULL,
    salt VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL, -- sha512 produces 128bit hex number
    session_key VARCHAR(32) UNIQUE,
    key_expire TIMESTAMP
);
