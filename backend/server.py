from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

from auth import Login, CreateAccount, Logout
from welcome_api import ListSubjects, ListCourses, ListUniversities, ListQueue

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'
api = Api(app)


class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')

# Auth
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CreateAccount, '/signup')

# Welcome
api.add_resource(ListSubjects, '/subjects/<int:university_id>')
api.add_resource(ListCourses, '/courses/<int:subject_id>')
api.add_resource(ListUniversities, '/universities')
api.add_resource(ListQueue, '/queue/<int:course_id>')

if __name__ == '__main__':
    app.run(debug=True)