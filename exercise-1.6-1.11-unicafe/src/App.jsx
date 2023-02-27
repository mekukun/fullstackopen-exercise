import { useState } from "react";
import Button from "./Button.jsx";
import Statistics from "./Statistics.jsx";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const statisticGathered = good || neutral || bad;

  const dataObject = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>

      <div>
        <h1>Statistics</h1>
        {statisticGathered ? (
          <Statistics data={dataObject} />
        ) : (
          <p>No feedback given.</p>
        )}
      </div>
    </div>
  );
};

export default App;
