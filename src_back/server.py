from flask import Flask
from flask_restful import Resource, Api

from twotor.src_back.api.auth import Login, CreateAccount

app = Flask(__name__)
api = Api(app)


class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')

# Auth
api.add_resource(Login, '/login')
api.add_resource(CreateAccount, '/signup')

if __name__ == '__main__':
    app.run(debug=True)