import numpy as np
import math

def get_scaled_num(num, max, target):
    return num / max * (target)

def generate_heatmap_data(depth_data, width, height, top_left, bot_right):
    # depth_data = [{'long': <longitude>, 'lat': <latitude>, data: <data>}]
    # width = <num pixels width>
    # height = <num pixels height>
    # top_left = <top left long, lat> 
    # top_right = <bottom right long, lat>

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
            distances = []
            # check if in known_points
            for pt in known_points:
                if i == pt[0] and j == pt[1]:
                    print(f"found point {i}, {j}")
                    generated_points[i][j] = pt[2]
                    continue
                dist = math.sqrt((pt[0] - i)**2 + (pt[1] - j)**2)
                distances.append(dist)
            
            # weight all other known points
            dist_sum = sum(distances)
            weighted_avg = 0

            for k in range(len(distances)):
                weighted_avg += known_points[k][2] * distances[k] / dist_sum

            generated_points[i][j] = weighted_avg

    return generated_points