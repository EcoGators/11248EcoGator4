import unittest
from unittest.mock import Mock, patch
from elevation import get_elevation


class TestGetElevation(unittest.TestCase):
    def setUp(self):
        self.mock_get_patcher = patch('elevation.requests.get')
        self.mock_get = self.mock_get_patcher.start()

    def tearDown(self):
        self.mock_get_patcher.stop()

    def test_getting_elevation_ok(self):
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

        response = get_elevation(-104.9847034, 39.7391536)

        self.assertTrue(response.ok)
        self.assertEqual(response.json(), expected)

    def test_getting_elevation_none(self):
        self.mock_get.return_value = Mock()
        self.mock_get.return_value.ok = False

        response = get_elevation(-104.9847034, 39.7391536)

        self.assertIsNone(response)


if __name__ == '__main__':
    unittest.main()
