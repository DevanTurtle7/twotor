from flask import Flask
from flask_restful import Resource, Api
from flask import  Response, Request
from database.database import db

app = Flask(__name__)
api = Api(app)


class HelloWorld(Resource):
    def get(self):
        return 'test ethan'


api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
