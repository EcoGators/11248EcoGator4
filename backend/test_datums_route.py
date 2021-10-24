import unittest
from unittest.mock import patch
from app import app


class TestDatumsRoute(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.mock_get_patcher = patch('app.get_datums')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_datums_route_ok(self):
        expected = {
            "DHQ": 0.24,
            "DLQ": 0.07,
            "DTL": 4.95,
            "GT": 2.75,
            "HAT": 7.388,
            "HWI": 12.35,
            "LAT": 2.749,
            "LWI": 6.17,
            "MHHW": 6.33,
            "MHW": 6.09,
            "MLLW": 3.58,
            "MLW": 3.64,
            "MN": 2.44,
            "MSL": 4.88,
            "MTL": 4.87,
            "STND": 0.0,
            "epoch": "0000-0000",
            "max": 8.369,
            "min": 1.831
        }

        self.mock_get.return_value = expected

        response = self.app.get('/datums/2695535')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, expected)

    def test_datums_route_bad_response(self):
        self.mock_get.return_value = None
        response = self.app.get('/datums/2695535')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, b'400 Bad Request')


if __name__ == '__main__':
    unittest.main()
