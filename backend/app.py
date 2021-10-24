from flask import Flask, request, Response
from datetime import date
import sqlite3
from elevation import get_elevation
from datums import get_datums

DB_PATH = 'asdf.db'


def connect_db():
    con = sqlite3.connect(DB_PATH)
    return con


app = Flask(__name__)

con = connect_db()
cur = con.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS temp(
                id INTEGER PRIMARY KEY,
                date text, 
                data text
            )''')
con.commit()
con.close()


@app.route("/")
def list_data():
    con = connect_db()
    cur = con.cursor()
    data = cur.execute('SELECT * FROM temp ORDER BY date')
    result = "<p>[data]<p>"
    for index, date, data in data:
        print(index, date, data)
        result += f"<p>[{index}]\t{data}\t{date}</p>"
    con.close()
    return result


@app.route("/insert/<data>")
def insert_data(data):
    con = connect_db()
    cur = con.cursor()
    cur.execute(
        f"INSERT INTO temp (date, data) VALUES ('{str(date.today())}','{data}')")
    con.commit()
    con.close()
    print(f"[insert] data inserted \"{data}\"")
    return "inserted"


@app.route("/elevation")
def elevation():
    long = request.args.get('long')
    lat = request.args.get('lat')
    if long is None or lat is None:
        return Response("400 Bad Request", status=400)
    data = get_elevation(long, lat)
    if data is None:
        return Response("400 Bad Request", status=400)
    return data.json()


@app.route("/datums/<station>")
def datums(station):
    data = get_datums(station)
    if data is None:
        return Response("400 Bad Request", status=400)
    return data
