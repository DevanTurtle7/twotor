from flask_restful import Resource
from flask import request

from db_auth import authenticate_session
from db_update_course import *


class AddHelpCourse(Resource):
    def post(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        course_id = request.form['course_id']

        if user_id and course_id:
            result = add_help_course(user_id, course_id)
            if result is None:
                return {'error': 'You are already added this course.'}

            return {'add course': True}
        return {'add course': False}


class DelHelpCourse(Resource):
    def post(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        course_id = request.form['course_id']

        if user_id and course_id:
            del_help_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}


class AddTutorCourse(Resource):
    def post(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        course_id = request.form['course_id']

        if user_id and course_id:
            result = add_tutor_course(user_id, course_id)
            if result is None:
                return {'error': 'You are already a tutor for this course.'}

            return {'add course': True}
        return {'add course': False}


class DelTutorCourse(Resource):
    def post(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]
        course_id = request.form['course_id']

        if user_id and course_id:
            del_tutor_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}
