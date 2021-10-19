import requests


def get_elevation(long, lat):
    url = f'https://maps.googleapis.com/maps/api/elevation/json?locations={lat}%2C{long}&key=AIzaSyBiv0uFNdKncAvVK0b12UWLuJAelz1vrLw'
    response = requests.get(url)
    if response.ok:
        return response
    else:
        return None
