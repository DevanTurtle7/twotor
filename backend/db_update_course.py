from database import db

def add_help_course(user_id, course_id):
    sql = """
    INSERT INTO need_help
    (user_id, course_id)
    VALUE(%s, %s)
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)

def del_help_course(user_id, course_id):
    sql = """
    DELETE FROM need_help
    WHERE user_id = %s AND course_id = %s
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)

def add_tutor_course(user_id, course_id):
    sql = """
    INSERT INTO can_tutor
    (user_id, course_id)
    VALUE(%s, %s)
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)

def del_tutor_course(user_id, course_id):
    sql = """
    DELETE FROM can_tutor
    WHERE user_id = %s AND course_id = %s
    """
    params = [user_id, course_id]
    return db.exec_commit(sql, params)

