import psycopg2.errors

from database import db


def join_queue(user_id, course_id, description):
    sql = """
    INSERT INTO help_queue
    (user_id, course_id, description)
    VALUES(%s, %s, %s);
    """
    params = [user_id, course_id, description]
    try:
        return db.exec_commit(sql, params)
    except psycopg2.errors.UniqueViolation:
        return None


def leave_queue(user_id, course_id):
    sql = """
    DELETE FROM help_queue
    WHERE user_id = %s AND course_id = %s;
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)
