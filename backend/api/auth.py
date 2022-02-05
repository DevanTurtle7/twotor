from flask_restful import Resource
from flask import request, make_response
import secrets
from hashlib import sha512

from backend.database.db_auth import *


def generate_session_key():
    """
    Generates a 32 character url safe token
    for use as a browser session key
    """
    return secrets.token_urlsafe(24)


def generate_salt():
    """
    Internal method to generate a salt for a new user in the database
    128 chars for increased security
    """
    return secrets.token_hex(64)


def hash_password_with_salt(salt, password):
    combined_str = salt + password
    return sha512(combined_str.encode("utf-8")).hexdigest()


def hash_password(username, password):
    """Generate the sha512 hash of the salt + password

    Returns:
        str: sha512 hash (128 chars)
    """
    salt = get_salt(username)
    combined_str = salt + password
    return sha512(combined_str.encode("utf-8")).hexdigest()


def validate(username, password):
    """
    Check if username and password combo is valid
    """
    return hash_password(username, password) == get_password_hash(username)


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
        username = request.form['username']
        password = request.form['password']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        
        # verify new account
        if username and password and first_name and last_name and email:
            # Create account
            print(create_account(username, password, email, first_name, last_name))

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