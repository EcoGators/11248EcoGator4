import sqlite3
import datetime as dt
import json
import requests
from init_db import init_db

DB_PATH = 'asdf.db'

def init_db():
    con = sqlite3.connect(DB_PATH)
    return con

class Station:
    def __enter__(self):
        return self

    def __init__(self, longitude, latitude, station_id, resp_data=None):
        self.conn = init_db()

        self.longitude = longitude
        self.latitude = latitude
        self.station_id = station_id

        # type checking reponse data
        if type(resp_data) == dict:
            self.resp_data = resp_data
        if type(resp_data) == str:
            self.resp_data = json.loads(resp_data)
        
        if self.resp_data != None:
            # set all other local vars
            print(resp_data)
            self.update_data(self.station_id)
    
    def update_data(self, station_id):
        cur = self.conn.cursor()

        exists = cur.execute(f'''SELECT 1 FROM stations WHERE id={station_id}''')
        data = exists.fetchall()
        details_url = self.resp_data['details']['self']
        details = requests.get(details_url)
        

        if len(data) == 0 and details.ok:
            # doesn't exist
            details = details.json()
            established = details['established']
            noaa_chart_num = details['noaachart']
            add_query = f'INSERT INTO stations (longitude, latitude, id, established, noaa_chart_num) VALUES ({self.longitude}, {self.latitude}, {self.station_id}, "{established}", {noaa_chart_num})'
            cur.execute(add_query)
        
        # enter known_points
        

    def __exit__(self, exc_type, exc_value, trace):
        self.cursor.close()
        if isinstance(exc_value, Exception):
            self.conn.rollback()
        else:
            self.conn.commit()
        self.conn.close()
