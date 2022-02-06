from flask_restful import Resource
from flask import jsonify
from database import db


class ListUniversities(Resource):
    def get(self):
        sql = """
        SELECT id, name
        FROM universities
        """
        return jsonify(db.exec_get_all_json(sql))


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
        SELECT courses.id, courses.name, CONCAT(subjects.code, '-', number) code
        FROM courses
        INNER JOIN subjects
        ON subjects.id = %s
        WHERE subject_id = %s
        """
        return jsonify(db.exec_get_all_json(sql, (subject_id, subject_id)))

