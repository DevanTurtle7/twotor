from flask_restful import Resource, reqparse
from flask import *
from datetime import datetime

from db_auth import *
from db_message import *

class CreateChat(Resource):
    def post(self):
        session_key = request.headers['authorization']
        sender_id = authenticate_session(session_key)

        if sender_id is None:
            return 'Not authenticated.'

        sender_id = sender_id[0]
        receiver_id = get_chatter(session_key)
        time_sent = datetime.now()
        message = request.json['message-input']

        if sender_id and receiver_id and message:
            create_chat(sender_id, receiver_id, time_sent, message)

            return {'chat created': True}
        return {'chat created': False}

class ListChats(Resource):
    def post(self):
        session_key = request.headers['authorization']
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        chatting_with = get_chatter(session_key)

        sql = """
        SELECT sender_id, receiver_id, time_sent, message
        FROM message_log
        WHERE (sender_id = %s AND receiver_id = %s) OR (sender_id = %s AND receiver_id = %s ) ORDER BY time_sent desc;
        """
        params = [user_id, chatting_with, chatting_with, user_id]
        return jsonify(db.exec_get_all_json(sql, params))

class JoinChat(Resource):
    def post(self):
        session_key = request.headers['authorization']
        user_id = authenticate_session(session_key)
        chatting_with = request.json['receiver']

        print(chatting_with)

        print(user_id)
        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        join_chat(user_id, chatting_with)

        return {'Joined chat': True}

class LeaveChat(Resource):
    def post(self):
        session_key = request.headers['authorization']
        user_id = authenticate_session(session_key)
        chatting_with = get_chatter(session_key)
        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        leave_chat(user_id, chatting_with)

        return {'Joined chat': True}
