from flask_restful import Resource
from flask import request

from db_update_course import *

class AddHelpCourse(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            add_help_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}

class DelHelpCourse(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            del_help_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}


class AddTutorCourse(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            add_tutor_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}


class DelTutorCourse(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            del_tutor_course(user_id, course_id)

            return {'add course': True}
        return {'add course': False}