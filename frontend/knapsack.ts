export interface KnapsackRequest {
  weights: number[];
  values: number[];
  capacity: number;
}

export interface KnapsackResponse {
  maximumValue: number;
}

export function knapsack(
  weights: number[],
  values: number[],
  capacity: number
): number {
  const n = values.length;
  const K: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        K[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        K[i][w] = Math.max(values[i - 1] + K[i - 1][w - weights[i - 1]], K[i - 1][w]);
      } else {
        K[i][w] = K[i - 1][w];
      }
    }
  }

  return K[n][capacity];
}

export function handleKnapsackRequest(
  request: KnapsackRequest
): KnapsackResponse {
  const { weights, values, capacity } = request;
  const maximumValue = knapsack(weights, values, capacity);
  return { maximumValue };
}


import * as fs from 'fs';

const input = fs.readFileSync(0, 'utf-8'); // Read from stdin (0)
const request: KnapsackRequest = JSON.parse(input);
const response: KnapsackResponse = handleKnapsackRequest(request);
console.log(JSON.stringify(response));