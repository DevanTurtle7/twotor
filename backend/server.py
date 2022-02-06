from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

from auth import Login, CreateAccount, Logout, Account, GetId, GetChattingWith
from welcome_api import ListSubjects, ListCourses, ListUniversities
from queue import *
from update_course import *
from message import *

app = Flask(__name__)
cors = CORS(app)
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
# Account
api.add_resource(Account, '/getname')
api.add_resource(GetChattingWith, '/getChattingWith')
api.add_resource(GetId, '/getid')

# =============
# Welcome
api.add_resource(ListSubjects, '/subjects/<int:university_id>')
api.add_resource(ListCourses, '/courses/<int:subject_id>')
api.add_resource(ListUniversities, '/universities')

# =============
# Queue
api.add_resource(ListQueue, '/queue')  # good
api.add_resource(JoinQueue, '/joinQueue')
api.add_resource(LeaveQueue, '/leaveQueue')
api.add_resource(ListNeedHelp, '/listNeedHelp')

# =============
# Update Account Info
api.add_resource(AddHelpCourse, '/addHelp')
api.add_resource(AddTutorCourse, '/addTutor')
api.add_resource(DelHelpCourse, '/delHelp')
api.add_resource(DelTutorCourse, '/delTutor ')

# =============
# Chat
api.add_resource(CreateChat, '/createChat')
api.add_resource(ListChats, '/chatList')
api.add_resource(JoinChat, '/joinChat')
api.add_resource(LeaveChat, '/leaveChat')

if __name__ == '__main__':
    app.run(debug=True)
