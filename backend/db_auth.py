import secrets
from hashlib import sha512
from psycopg2.extras import execute_values
from database import db


def generate_session_key():
    """
    Generates a 32 character url safe token
    for use as a browser session key
    """
    return secrets.token_urlsafe(24)


def generate_salt():
    """
    Internal method to generate a salt for a new user in the database
    128 chars for increased security
    """
    return secrets.token_hex(64)


def hash_password_with_salt(salt, password):
    combined_str = salt + password
    return sha512(combined_str.encode("utf-8")).hexdigest()


def hash_password(username, password):
    """Generate the sha512 hash of the salt + password

    Returns:
        str: sha512 hash (128 chars)
    """
    salt = get_salt(username)
    combined_str = salt + password
    return sha512(combined_str.encode("utf-8")).hexdigest()


def validate(username, password):
    """
    Check if username and password combo is valid
    """
    password_hash = get_password_hash(username)
    if password_hash is None:
        return False
    else:
        password_hash = password_hash[0]

    return hash_password(username, password) == password_hash


def get_salt(username):
    sql = """SELECT salt FROM accounts WHERE username = %s;"""
    return db.exec_get_one(sql, username)[0]


def get_password_hash(username):
    sql = """SELECT password FROM accounts WHERE username = %s;"""
    return db.exec_get_one(sql, username)


def update_session_key(username, new_session_key):
    sql = """
    UPDATE accounts
    SET key_expire = NOW() + interval '15 minutes',
    session_key = %s
    WHERE username = %s;
    """
    return db.exec_commit(sql, (new_session_key, username))


def session_key_exists(session_key):
    sql = """
    SELECT 1
    FROM accounts
    WHERE session_key = %s;
    """
    return bool(db.exec_get_one(sql, session_key))


def authenticate_session(session_key):
    sql = """
    SELECT id
    FROM accounts
    WHERE session_key = %s AND
    key_expire > NOW();
    """
    return db.exec_get_one(sql, session_key)


def logout(session_key):
    sql = """
    UPDATE accounts
    SET key_expire = NOW()
    WHERE session_key = %s;
    """
    return db.exec_commit(sql, session_key)


def create_account(username, password, email, first_name, last_name, university):
    sql = """
    INSERT INTO accounts
    (username, password, email, university_ID, first_name, last_name, salt)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    RETURNING id;
    """

    salt = generate_salt()
    params = [username, hash_password_with_salt(salt, password), email, university, first_name, last_name, salt]
    return db.exec_commit_r(sql, params)[0][0]


def create_need_help(user_id, courses):
    sql = """
    INSERT INTO need_help
    (user_id, course_id)
    VALUES %s
    """
    params = [(user_id, x['id']) for x in courses]
    cur = db.conn.cursor()
    return execute_values(cur, sql, params)


def create_can_tutor(user_id, courses):
    sql = """
    INSERT INTO can_tutor
    (user_id, course_id)
    VALUES %s
    """
    params = [(user_id, x['id']) for x in courses]
    cur = db.conn.cursor()
    return execute_values(cur, sql, params)

