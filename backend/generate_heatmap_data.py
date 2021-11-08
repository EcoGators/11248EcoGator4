import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import math
from time import process_time
import json


def normalize_2d_array(arr, arr_min=0, arr_max=1):
    amax = 1
    amin = arr[np.unravel_index(arr.argmin(), arr.shape)[0]]
    arr = (arr-amin)*(arr_max-arr_min)
    denom = amax - amin
    denom[denom == 0] = 1
    for i in range(len(arr)):
        arr[i] = arr[i] * 255
    return arr.astype(np.int8)


def get_scaled_num(num, max, target):
    return num / max * (target)


def generate_heatmap_data(depth_data, width, height, top_left, bot_right):
    # depth_data = [{'long': <longitude>, 'lat': <latitude>, data: <data>}]
    # width = <num pixels width>
    # height = <num pixels height>
    # top_left = <top left long, lat>
    # top_right = <bottom right long, lat>

    # change this for less accurate
    start = process_time()

    print(f"width: {width}, height: {height}")

    degree_width = top_left[0] - bot_right[0]
    degree_height = bot_right[1] - top_left[1]

    generated_points = np.zeros([width, height])
    known_points = []

    for data in depth_data:

        relative_long = abs(data['long']) - abs(top_left[0])
        # print('long', relative_long)
        relative_lat = abs(data['lat']) - abs(top_left[1])
        # print('lat', relative_lat)

        x = int(abs(get_scaled_num(relative_long, degree_width, width)))
        y = int(abs(get_scaled_num(relative_lat, degree_height, height)))
        # print(f"Known Point: {x}, {y}, depth: {data['data']}")

        generated_points[x][y] = data['long']
        known_points.append([x, y, data['data']])

    for i in range(width):
        for j in range(height):
            # check if in known_points
            found_known_points = False
            for pt in known_points:
                if i == pt[0] and j == pt[1]:
                    print(f"found point {i}, {j}")
                    generated_points[i][j] = pt[2]
                    found_known_points = True
                    continue

            if found_known_points:
                continue

            # get distance from current point
            distances = []
            for pt in known_points:
                dist = math.sqrt((pt[0] - i)**2 + (pt[1] - j)**2)
                distances.append(dist)

            # weight all other known points
            dist_sum = sum(distances)
            weighted_avg = 0

            for k in range(len(distances)):
                weighted_avg += known_points[k][2] * distances[k] / dist_sum

            generated_points[i][j] = weighted_avg

    save_file = json.dumps(generated_points.tolist())
    with open('heatmap_data.json', 'w') as f:
        f.write(save_file)

    end = process_time()
    print(f"{end-start} seconds")

    dpi = 80
    f, ax = plt.subplots(figsize=(width/dpi, height/dpi), dpi=dpi)
    ax = sns.heatmap(generated_points, cbar=False,
                     xticklabels=False, yticklabels=False, center=0)
    f.savefig('heatmap.jpeg', pad_inches=0.0, bbox_inches='tight', dpi=dpi)

    # Uncomment to reset tests
    # generated_points.tofile('example_heatmap_data.txt')

    return generated_points
