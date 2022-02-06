from database import db

def create_chat(sender_id, receiver_id, time_sent, message):
    sql = """
    INSERT INTO message_log 
    (sender_id, receiver_id, time_sent, message)
    VALUES (%s, %s, %s, %s)
    """
    params = [sender_id, receiver_id, time_sent, message]
    return db.exec_commit(sql, params)

def join_chat(user_id, chatting_with):
    sql = """
    UPDATE accounts
    SET chatting_with = %s
    WHERE user_id = %s
    """
    params = [chatting_with, user_id]
    return db.exec_commit(sql, params)

def leave_chat(user_id, chatting_with):
    sql = """
    UPDATE accounts 
    SET chatting_with = %s
    WHERE user_id = %s
    """
    params = [chatting_with, user_id]
    return db.exec_commit(sql, params)




