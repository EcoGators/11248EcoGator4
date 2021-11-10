import requests
from pandas import DataFrame
from schema import Station


def get_stations(station_type):
    url = f'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type={station_type}&expand=tidepredoffsets&extra=details&units=english'
    response = requests.get(url)

    if not response.ok:
        return response.status_code
    
    json = response.json()
    stations = []
    for station in json['stations']:
        stations.append(Station(station['lng'], station['lat'], station['id'], resp_data=station))

    return stations

def get_datums(station_id):
    url = f'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{station_id}/datums.json?units=english'
    response = requests.get(url)

    if not response.ok:
        return None

    json = response.json()
    result = dict()

    for datum in json['datums']:
        result[datum['name']] = datum['value']

    datum_names = ['epoch', 'LAT', 'HAT', 'min', 'max']

    for datum_name in datum_names:
        if json[datum_name] is not None:
            result[datum_name] = json[datum_name]

    return result


def get_predictions(begin_date, end_date, datum, station, time_zone):
    url = f"https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date={begin_date}&end_date={end_date}&datum={datum}&station={station}&time_zone={time_zone}&units=english&format=json"
    response = requests.get(url)

    if not response.ok:
        return None

    return DataFrame.from_records(response.json()["predictions"])


def get_water_level(begin_date, end_date, datum, station, time_zone):
    url = f"https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=water_level&begin_date={begin_date}&end_date={end_date}&datum={datum}&station={station}&time_zone={time_zone}&units=english&format=json"
    response = requests.get(url)

    if not response.ok:
        return None

    return DataFrame.from_records(response.json()["data"])
