import web
import json

urls = (
    '/', 'Index',
    '/knapsack', 'Knapsack'
)

app = web.application(urls, globals())

class Index:
    def GET(self):
        return "Knapsack Problem Solver"

class Knapsack:
    def POST(self):
        data = json.loads(web.data())
        weights = data['weights']
        values = data['values']
        capacity = data['capacity']
        result = knapsack(weights, values, capacity)
        return json.dumps(result)

def knapsack(weights, values, capacity):
    n = len(values)
    K = [[0 for x in range(capacity + 1)] for x in range(n + 1)]

    for i in range(n + 1):
        for w in range(capacity + 1):
            if i == 0 or w == 0:
                K[i][w] = 0
            elif weights[i-1] <= w:
                K[i][w] = max(values[i-1] + K[i-1][w-weights[i-1]], K[i-1][w])
            else:
                K[i][w] = K[i-1][w]

    return K[n][capacity]

if __name__ == "__main__":
    app.run()
