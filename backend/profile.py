from flask import request, Response
from flask_restful import Resource

import db_profile

class SetUpAccount(Resource):
    def post(self):
        university = request.form['university']
        need_help = request.form['need_help']
        can_tutor = request.form['can_tutor']

        if university and need_help and can_tutor:

            set_up_account(university, need_help, can_tutor)

            response = make_response({'valid': True})
            return response

        return {'valid': False}
