-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS universities, subjects, courses, accounts, need_help, can_tutor, help_queue, message_log CASCADE;

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
    chatting_with user_id REFERENCES accounts ON DELETE SET NULL

);

CREATE TABLE need_help (
    user_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses ON DELETE CASCADE,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE can_tutor (
    user_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses ON DELETE CASCADE,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE help_queue (
    user_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses ON DELETE CASCADE,
    description TEXT,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE message_log (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES accounts ON DELETE CASCADE,
    time_sent TIMESTAMP,
    message TEXT
);