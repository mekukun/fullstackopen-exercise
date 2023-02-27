const StatisticPos = ({ data }) => {
  const sumAll = data.good + data.neutral + data.bad;
  const positive = (data.good / sumAll) * 100;
  return (
    <tr>
      <td>Positive</td>
      <td>{positive}%</td>
    </tr>
  );
};

const StatisticAvg = ({ data }) => {
  const sumAll = data.good + data.neutral + data.bad;
  const average = (data.good * 1 + data.neutral * 0 + data.bad * -1) / sumAll;
  return (
    <tr>
      <td>Average</td>
      <td>{average}</td>
    </tr>
  );
};

const StatisticSum = ({ data }) => {
  const sumAll = data.good + data.neutral + data.bad;
  return (
    <tr>
      <td>Sum</td>
      <td>{sumAll}</td>
    </tr>
  );
};

const StatisticCount = ({ data, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{data}</td>
    </tr>
  );
};

const Statistics = ({ data }) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticCount data={data.good} text="Good" />
          <StatisticCount data={data.neutral} text="Neutral" />
          <StatisticCount data={data.bad} text="Bad" />
          <StatisticSum data={data} />
          <StatisticAvg data={data} />
          <StatisticPos data={data} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
