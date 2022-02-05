from flask_restful import Resource
from flask import jsonify

from database import db


class ListUniversities(Resource):
    def get(self):
        # Ethan do this
        pass


class ListSubjects(Resource):
    def get(self, university_id):
        sql = """
        SELECT id, code, name
        FROM subjects
        WHERE university_id = %s
        """
        return jsonify(db.exec_get_all_json(sql, university_id))


class ListCourses(Resource):
    def get(self, subject_id):
        sql = """
        SELECT id, number, name
        FROM courses
        WHERE subject_id = %s
        """
        return jsonify(db.exec_get_all_json(sql, subject_id))

