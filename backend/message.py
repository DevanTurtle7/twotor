from flask_restful import Resource
from flask import request, make_response, jsonify
from datetime import datetime

from db_auth import *
from db_message import *

class CreateChat(Resource):
    def post(self):
        sender_id = request.form['sender_id']
        receiver_id = request.form['receiver_id']
        time_sent = datetime.now()
        message = request.form['message']

        if sender_id and receiver_id and message:
            create_chat(sender_id, receiver_id, time_sent, message)

            return {'chat created': True}
        return {'chat created': False}

class ListChats(Resource):
    def post(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        chatting_with = get_chatter(session_key)

        sql = """
        SELECT sender_id, receiver_id, time_sent, message
        FROM message_log
        WHERE (sender_id = %s AND receiver_id = ) OR (sender_id =  AND receiver_id = s%)
        """
        params = [user_id, chatting_with, chatting_with, user_id]
        return jsonify(db.exec_get_all_json(sql, params))