from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

from auth import Login, CreateAccount, Logout
from welcome_api import ListSubjects, ListCourses, ListUniversities
from queue import *
from update_course import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'
api = Api(app)


# =============
# Test Endpoint
class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')
# =============

# =============
# Auth
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CreateAccount, '/signup')

# =============
# Welcome
api.add_resource(ListSubjects, '/subjects/<int:university_id>')
api.add_resource(ListCourses, '/courses/<int:subject_id>')
api.add_resource(ListUniversities, '/universities')

# =============
# Queue
api.add_resource(ListQueue, '/queue')
api.add_resource(JoinQueue, '/joinQueue')
api.add_resource(LeaveQueue, '/leaveQueue')

# =============
# Update Account Info
api.add_resource(AddHelpCourse, '/addHelp')
api.add_resource(AddTutorCourse, '/addTutor')
api.add_resource(DelHelpCourse, '/delHelp')
api.add_resource(DelTutorCourse, '/delTutor ')

if __name__ == '__main__':
    app.run(debug=True)
