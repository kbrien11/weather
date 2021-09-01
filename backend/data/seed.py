import csv
from os import curdir
import sqlite3
from sqlite3.dbapi2 import Cursor


# parsing the csv data to add into the SQL DB
def dump_data(filepath):
    with open(filepath,'r') as input:
        reader = csv.reader(input)
        next(reader)
        for data in reader:
            City = data[0]
            State = data[1]
            add_data(City,State)




def add_data(City,State):
    with sqlite3.connect("weather.db") as conn:
        cursor = conn.cursor()
        SQL = """INSERT INTO location(City,State)
                VALUES (?,?)"""
        cursor.execute(SQL, (City,State))



if __name__=="__main__":
   dump_data("weatherinfo.csv")
