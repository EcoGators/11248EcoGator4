import unittest
from unittest.mock import Mock, patch
from app import app


class TestElevationRoute(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.mock_get_patcher = patch('app.get_elevation')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_elevation_route_ok(self):
        expected = {
            "results": [
                {
                    "elevation": 1608.637939453125,
                    "location": {"lat": 39.7391536, "lng": -104.9847034},
                    "resolution": 4.771975994110107
                }
            ],
            "status": "OK"
        }

        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = True
        self.mock_get.return_value.json.return_value = expected

        response = self.app.get('/elevation?long=-104.9847034&lat=39.7391536')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, expected)

    def test_elevation_route_bad_response(self):
        self.mock_get.return_value = None
        response = self.app.get('/elevation?long=-104.9847034&lat=39.7391536')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, b'400 Bad Request')

    def test_elevation_route_no_long(self):
        self.mock_get.return_value = None
        response = self.app.get('/elevation?lat=39.7391536')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, b'400 Bad Request')

    def test_elevation_route_no_lat(self):
        self.mock_get.return_value = None
        response = self.app.get('/elevation?long=-104.9847034')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, b'400 Bad Request')


if __name__ == '__main__':
    unittest.main()
