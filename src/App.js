import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently &nbsp;
        <span data-test="count">{count}</span>
      </h1>
      {error && (
        <h2 data-test="error-message">The counter cannot be less than 0</h2>
      )}
      <button
        data-test="increment-button"
        onClick={() => {
          setCount(count + 1);
          setError(false);
        }}
      >
        Increment Counter
      </button>
      &nbsp;
      <button
        data-test="decrement-button"
        onClick={() => {
          if (count === 0) {
            setError(true);
          } else {
            setCount(count - 1);
          }
        }}
      >
        Decrement Counter
      </button>
    </div>
  );
}

export default App;
