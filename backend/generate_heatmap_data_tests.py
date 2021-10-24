from generate_heatmap_data import generate_heatmap_data
import seaborn as sns
import matplotlib.pyplot as plt

# test
depth_data = [
    {
        'long': 26.13167,
        'lat': 81.80833,
        'data': 2.4
    },
    {
        'long': 26.64833,
        'lat': 81.87167,
        'data': 1.2
    },
    # {
    #     'long': 26.017728,
    #     'lat': 81.742699,
    #     'data': 0.8
    # }
]

width = 360
height = 500

top_left = [26.826722, -82.444167]
bot_right = [26.016734, -81.309390]

gen_data = generate_heatmap_data(depth_data, width, height, top_left, bot_right)
sns.heatmap(gen_data, xticklabels=False, yticklabels=False)
plt.savefig('test_figure.png')