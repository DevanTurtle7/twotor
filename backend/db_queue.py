import psycopg2.errors
from flask import jsonify

from database import db


def list_need_help(user_id):
    sql = """
        SELECT courses.id, courses.name, CONCAT(subjects.code, '-', number) code
        FROM need_help
        INNER JOIN courses
        ON need_help.course_id = courses.id
        INNER JOIN subjects
        ON subjects.id = courses.subject_id
        WHERE need_help.user_id = %s;
    """
    return jsonify(db.exec_get_all_json(sql, user_id))

def leave_all_queue(user_id):
    sql = """
    DELETE FROM help_queue
    WHERE user_id = %s
    """
    return db.exec_commit(sql, user_id)


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
        return "error"


def leave_queue(user_id, course_id):
    sql = """
    DELETE FROM help_queue
    WHERE user_id = %s AND course_id = %s;
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)
