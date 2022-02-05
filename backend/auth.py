from flask_restful import Resource
from flask import request, make_response

from db_auth import *


class Login(Resource):
    def post(self):
        # Retrieve username and password from body of request
        username = request.form['username']
        password = request.form['password']

        # Verify password
        if username and password and validate(username, password):
            # Ensure session_key is unique (this really never should run)
            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()

            update_session_key(username, new_session_key)

            # Send back response with cookie
            res = make_response({'valid': True})
            res.set_cookie('session', new_session_key, max_age=900)
            return res

        return {'valid': False}


class Logout(Resource):
    def get(self):
        session_key = request.cookies.get('session')
        if session_key and session_key_exists(session_key):
            logout(session_key)

            # Send back response with deleted cookie
            res = make_response({'logout': True})
            res.set_cookie('session', '', max_age=0)
            return res

        return {'logout': False}


class CreateAccount(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        university_id = request.json['university_id']
        need_help = request.json['need_help']
        can_tutor = request.json['can_tutor']
        
        # verify new account
        if username and password and first_name and last_name and email and university_id and need_help and can_tutor:
            # Create account
            user_id = create_account(username, password, email, first_name, last_name, university_id)
            print(user_id, can_tutor, need_help)
            create_can_tutor(user_id, can_tutor)
            create_need_help(user_id, need_help)

            # Give them a session key
            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()
            
            update_session_key(username, new_session_key)
            
            # Send back with cookie
            response = make_response({'valid': True})
            response.set_cookie('session', new_session_key, max_age=900)
            return response

        return{'valid': False}