import sqlite3




# this is the model/class for the location table in the database



class Location:
    dbpath = "data/weather.db"
    def __init__(self,pk,city,state):
        self.pk = pk
        self.city = city
        self.state = state



# limiting data pull to 60 as pulling all the locations at once would be a very slow pull
    @classmethod
    def get_location_data(cls):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM location LIMIT 60"""
            cursor.execute(SQL,)
            results = cursor.fetchall()
            return results
