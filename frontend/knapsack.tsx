import React, { useState } from 'react';

const App: React.FC = () => {
  const [weights, setWeights] = useState<string>('');
  const [values, setValues] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/knapsack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weights: weights.split(',').map(Number),
        values: values.split(',').map(Number),
        capacity: Number(capacity),
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <h1>Knapsack Problem Solver</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Weights (comma separated):
          <input
            type="text"
            value={weights}
            onChange={(e) => setWeights(e.target.value)}
          />
        </label>
        <br />
        <label>
          Values (comma separated):
          <input
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
          />
        </label>
        <br />
        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Solve</button>
      </form>
      {result !== null && (
        <div>
          <h2>Result</h2>
          <p>Maximum value: {result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
