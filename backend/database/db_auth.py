from database import db

def username_email_exists(username, email):
    sql = """SELECT COUNT (*) FROM accounts WHERE username = %s;"""
    repeated_username = db.exec_get_one(sql, username)[0]
    sql = """SELECT COUNT (*) FROM accounts WHERE email = %s;"""
    repeated_email = db.exec_get_one(sql, email)[0]
    return repeated_email != 0 | repeated_username != 0