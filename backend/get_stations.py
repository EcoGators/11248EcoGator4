import pandas as pd


def get_stations(bounds):
    """
    Get all stations within the given bounds.

    :param bounds: The bounds of the area to search for stations.
    :type bounds: list
    :return: A list of stations.
    :rtype: list
    """
    stations = pd.read_csv('stations.json')
    print(stations)

    return stations


get_stations([[12, 12], [13, 13]])
