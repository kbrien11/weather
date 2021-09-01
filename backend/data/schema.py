import sqlite3
import os
from sqlite3.dbapi2 import Cursor



DIR=os.path.dirname(__file__)
DBNAME = "weather.db"
DBPATH = os.path.join(DIR,DBNAME)



def schema(dbpath):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        SQL = "DROP TABLE IF EXISTS location;"
        cursor.execute(SQL)
        SQL = """CREATE TABLE location(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            City VARCHAR(40),
            State VARCHAR(40)
        );"""

        cursor.execute(SQL)
schema(DBPATH)
