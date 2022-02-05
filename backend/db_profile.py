from flask import request, Response
from flask_restful import Resource


def set_up_profile(university, need_help, can_tutor):
    sql = """
        INSERT INTO profile
        (university, need_help, can_tutor)
        VALUES (%s, %s, %s)
        RETURNING id;
        """
    params = [university, need_help, can_tutor]
    return