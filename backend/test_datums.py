from datetime import date
import json
import unittest
from unittest.mock import Mock, patch
from datums import *


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


class TestGetPredictions(unittest.TestCase):
    def setUp(self):
        self.mock_get_patcher = patch('datums.requests.get')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_getting_predictions_ok(self):
        data = {
            "predictions": [
                {"t": "2021-10-31 00:00", "v": "0.799"},
                {"t": "2021-10-31 00:06", "v": "0.812"},
                {"t": "2021-10-31 00:12", "v": "0.828"},
                {"t": "2021-10-31 00:18", "v": "0.846"},
                {"t": "2021-10-31 00:24", "v": "0.867"},
                {"t": "2021-10-31 00:30", "v": "0.890"},
                {"t": "2021-10-31 00:36", "v": "0.915"},
                {"t": "2021-10-31 00:42", "v": "0.942"},
                {"t": "2021-10-31 05:06", "v": "2.302"},
                {"t": "2021-10-31 05:12", "v": "2.316"}
            ]
        }

        expected = DataFrame.from_records(data["predictions"])

        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = True
        self.mock_get.return_value.json.return_value = data

        result = get_predictions(20211031, 20211101,
                                 "MLLW", 8723214, "LST_LDT")

        self.assertTrue(result.equals(expected))

    def test_getting_predictions_none(self):
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = False

        result = get_predictions(20211031, 20211101,
                                 "MLLW", 8723214, "LST_LDT")

        self.assertIsNone(result)


class TestGetWaterLevel(unittest.TestCase):
    def setUp(self):
        self.mock_get_patcher = patch('datums.requests.get')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_getting_water_level_ok(self):
        data = {
            "metadata": {
                "id": "8723214",
                "name": "Virginia Key, Biscayne Bay",
                "lat": "25.7314",
                "lon": "-80.1618"
            },
            "data": [
                {
                    "t": "2021-10-31 00:00",
                    "v": "1.247",
                    "s": "0.016",
                    "f": "1,0,0,0",
                    "q": "p"
                },
                {
                    "t": "2021-10-31 00:06",
                    "v": "1.247",
                    "s": "0.016",
                    "f": "0,0,0,0",
                    "q": "p"
                },
                {
                    "t": "2021-10-31 00:12",
                    "v": "1.257",
                    "s": "0.010",
                    "f": "1,0,0,0",
                    "q": "p"
                }
            ]
        }

        expected = DataFrame.from_records(data["data"])

        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = True
        self.mock_get.return_value.json.return_value = data

        result = get_water_level(20211031, 20211101,
                                 "MLLW", 8723214, "LST_LDT")

        self.assertTrue(result.equals(expected))

    def test_getting_water_level_none(self):
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = False

        result = get_water_level(20211031, 20211101,
                                 "MLLW", 8723214, "LST_LDT")

        self.assertIsNone(result)


if __name__ == '__main__':
    unittest.main()
