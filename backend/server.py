from flask import Flask
from flask_restful import Resource, Api

from backend.api.auth import Login

app = Flask(__name__)
api = Api(app)


class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')

# Auth
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(debug=True)
