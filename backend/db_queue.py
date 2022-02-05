from database import db

def join_queue(user_id, course_id):
    sql = """
    INSERT INTO help_queue
    (user_id, course_id)
    VALUES(%s, %s)
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)

def leave_queue(user_id, course_id):
    sql = """
    DELETE FROM help_queue
    WHERE user_id = %s AND course = %s
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)