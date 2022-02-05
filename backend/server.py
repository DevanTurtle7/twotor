from flask import Flask
from flask_restful import Resource, Api

from auth import Login, CreateAccount, Logout
from welcome_api import ListSubjects, ListCourses

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(debug=True)
