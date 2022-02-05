from flask_restful import Resource
from flask import request, make_response

from database import db

class ListUniversities(Resource):
    def get(self):
        sql = """
        SELECT id, name
        FROM universities
        """
        return db.exec_get_all_json(sql)