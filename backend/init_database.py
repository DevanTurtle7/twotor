from database import db

db.exec_sql_file('init.sql')
db.exec_sql_file('test_data.sql')
