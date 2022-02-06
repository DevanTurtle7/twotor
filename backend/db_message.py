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
    WHERE id = %s;
    """
    params = [chatting_with, user_id]
    db.exec_commit(sql, params)

    sql2 = """
    UPDATE accounts
    SET chatting_with = %s
    WHERE id = %s;
    """
    params = [user_id, chatting_with]
    db.exec_commit(sql2, params)

    sql3= """
    DELETE FROM help_queue
    WHERE user_id = %s;
    """
    db.exec_commit(sql3, chatting_with)

def leave_chat(user_id):
    sql = """
    UPDATE accounts 
    SET chatting_with = NULL
    WHERE id = %s;
    DELETE FROM
    help_queue
    WHERE user_id = %s;
    """
    return db.exec_commit(sql, user_id)




