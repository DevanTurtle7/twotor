-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS universities, subjects, courses, accounts, need_help, can_help;

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT,
  code TEXT,
  university_id INTEGER REFERENCES universities ON DELETE CASCADE
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name TEXT,
    number INTEGER,
    subject_id INTEGER REFERENCES subjects ON DELETE CASCADE
);

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

CREATE TABLE need_help (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses ON DELETE CASCADE
);

CREATE TABLE can_help (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses ON DELETE CASCADE
);
