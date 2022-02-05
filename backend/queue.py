from flask_restful import Resource
from flask import request, make_response

from db_queue import *

class ListQueue(Resource):
    def get(self, course_id):
        sql = """
        SELECT id, user_id, course_id
        FROM help_queue
        WHERE course_id = %s
        """
        return jsonify(db.exec_get_all_json(sql, course_id))

class JoinQueue(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:

            join_queue(user_id, course_id)

            response = make_response({'join queue': True})
            return response

        return{'join queue': False}


class LeaveQueue(Resource):
    def post(self):
        user_id = request.form['user_id']
        course_id = request.form['course_id']

        if user_id and course_id:

            leave_queue(user_id, course_id)

            return {'left queue': True}

        return {'left queue': False}