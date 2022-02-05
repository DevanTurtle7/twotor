from database import db

# adds university, classes that need help, and classes that can be tutored to the DB
def set_up_account(university, need_help, can_tutor):
    sql = """
        """
    params = [university]
    return db.exec_commit_r(sql, params)[0][0]