from configparser import ConfigParser
import os
import json

import psycopg2
from psycopg2.extras import RealDictCursor, DictCursor

# Get database connection information
CONFIG = "database/config.ini"
config = ConfigParser()
config.read(CONFIG)

DATABASE = config["postgres"]["database"]
USERNAME = config["postgres"]["username"]
PASSWORD = config["postgres"]["password"]
SERVER = config["postgres"]["server"]
PORT = config["postgres"]["port"]


def parse_args(args):
    # If arg is a single string save the time on the user
    #   making it a 1 item tuple and convert it for them.
    if type(args) != tuple and type(args) != list:
        args = (args,)
    return args


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=DATABASE,
            user=USERNAME,
            password=PASSWORD,
            host=SERVER,
            port=PORT,
        )

        self.conn.autocommit = True

    def __del__(self):
        self.conn.close()

    def exec_sql_file(self, path):
        full_path = os.path.join(os.path.dirname(__file__), path)
        cur = self.conn.cursor()
        with open(full_path, "r") as file:
            cur.execute(file.read())
        self.conn.commit()

    def exec_get_one(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        return cur.fetchone()

    def exec_get_one_d(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor(cursor_factory=DictCursor)
        cur.execute(sql, args)
        return cur.fetchone()

    def exec_get_all(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        return cur.fetchall()

    def exec_get_all_d(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor(cursor_factory=DictCursor)
        cur.execute(sql, args)
        return cur.fetchall()

    def exec_get_all_json(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(sql, args)
        return json.dumps(cur.fetchall())

    def exec_commit(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        result = cur.execute(sql, args)
        self.conn.commit()
        return result

    def exec_commit_r(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        result = cur.fetchall()
        self.conn.commit()
        return result

    def exec_commit_many(self, sql, args=[]):
        cur = self.conn.cursor()
        result = cur.executemany(sql, args)
        self.conn.commit()
        return result


db = Database()
