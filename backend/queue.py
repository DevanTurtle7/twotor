from flask_restful import Resource
from flask import request, make_response, jsonify

from db_auth import authenticate_session
from db_queue import *


class ListQueue(Resource):
    def get(self):
        session_key = request.cookies.get('session')
        user_id = authenticate_session(session_key)

        if user_id is None:
            return 'Not authenticated.'

        user_id = user_id[0]

        sql = """
        SELECT first_name, last_name, courses.name course_name, queue.user_id, queue.description
        FROM can_tutor tutor
        INNER JOIN help_queue queue
        ON queue.course_id = tutor.course_id
        INNER JOIN accounts
        ON accounts.id = queue.user_id
        INNER JOIN courses
        ON queue.course_id = courses.id
        WHERE tutor.user_id = %s;
        """
        return jsonify(db.exec_get_all_json(sql, user_id))


class JoinQueue(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            join_queue(user_id, course_id)

            response = make_response({'join queue': True})
            return response

        return {'join queue': False}


class LeaveQueue(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:
            leave_queue(user_id, course_id)

            return {'left queue': True}

        return {'left queue': False}
