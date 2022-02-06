from flask_restful import Resource
from flask import request, make_response, jsonify

from db_queue import leave_all_queue
from db_auth import *


class GetChattingWith(Resource):
    def get(self):
        res = get_chatter_name(request.headers['authorization'])
        if len(res) == 0:
            return None
        else:
            return jsonify(res[0])

class Account(Resource):
    def get(self):
        return get_first_name(request.headers['authorization'])


class GetId(Resource):
    def get(self):
        session_key = request.headers['authorization']
        user_id = authenticate_session(session_key)
        return jsonify({'id': user_id})


class Login(Resource):
    def get(self):
        session_key = request.headers['authorization']
        user_id = authenticate_session(session_key)

        if user_id is None:
            return jsonify({'authenticated': False})
        else:
            return jsonify({'authenticated': True})

    def post(self):
        # Retrieve username and password from body of request
        username = request.json['username']
        password = request.json['password']

        # Verify password
        if username and password and validate(username, password):
            # Ensure session_key is unique (this really never should run)
            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()

            update_session_key(username, new_session_key)

            # Send back response with cookie
            return jsonify({'valid': True, 'cookie': new_session_key})

        return jsonify({'valid': False})


class Logout(Resource):
    def get(self):
        session_key = request.headers['authorization']
        if session_key and session_key_exists(session_key):
            user_id = authenticate_session(session_key)
            leave_all_queue(user_id)
            logout(session_key)

            # Send back response with deleted cookie
            return jsonify({'logout': True})

        return {'logout': False}


class CreateAccount(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        university_id = request.json['university_id']
        need_help = request.json['helpWith']
        can_tutor = request.json['canHelp']
        
        # verify new account
        if username and password and first_name and last_name and email and university_id and need_help and can_tutor:
            # Create account
            user_id = create_account(username, password, email, first_name, last_name, university_id)
            create_can_tutor(user_id, can_tutor)
            create_need_help(user_id, need_help)

            # Give them a session key
            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()
            
            update_session_key(username, new_session_key)
            
            # Send back with cookie
            return jsonify({'valid': True, 'cookie': new_session_key})

        return{'valid': False}