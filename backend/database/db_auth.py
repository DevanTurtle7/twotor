from database import db


def get_salt(username):
    sql = """SELECT salt FROM accounts WHERE username = %s;"""
    return db.exec_get_one(sql, username)[0]


def get_password_hash(username):
    sql = """SELECT password FROM accounts WHERE username = %s;"""
    return db.exec_get_one(sql, username)[0]


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
    SELECT id, username
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
