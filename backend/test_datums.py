import json
import unittest
from unittest.mock import Mock, patch
from datums import get_datums, get_stations


class TestGetDatums(unittest.TestCase):
    def setUp(self):
        self.mock_get_patcher = patch('datums.requests.get')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_getting_datums_ok(self):
        f = open('datums_test_data.json')
        data = json.load(f)
        f.close()

        expected = {
            "STND": 0.0,
            "MHHW": 6.33,
            "MHW": 6.09,
            "DTL": 4.95,
            "MTL": 4.87,
            "MSL": 4.88,
            "MLW": 3.64,
            "MLLW": 3.58,
            "GT": 2.75,
            "MN": 2.44,
            "DHQ": 0.24,
            "DLQ": 0.07,
            "HWI": 12.35,
            "LWI": 6.17,
            "epoch": "0000-0000",
            "LAT": 2.749,
            "HAT": 7.388,
            "min": 1.831,
            "max": 8.369
        }

        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = True
        self.mock_get.return_value.json.return_value = data

        result = get_datums(2695535)

        self.assertEqual(result, expected)

    def test_getting_datums_none(self):
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = False

        result = get_datums(2695535)

        self.assertIsNone(result)
    
    def test_getting_station_data(self):
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = True
        # self.mock_get.return_value.json.return_value = data

        stations = get_stations('waterlevels')
        print(stations)

        self.assertEqual(stations, stations)


if __name__ == '__main__':
    unittest.main()
