const PopularAnec = ({ anecdotes, vote }) => {
  const mostVoteIndex = vote.indexOf(Math.max(...vote));

  return (
    <div>
      <h1>Anecdote with Most Votes</h1>
      <p>{anecdotes[mostVoteIndex]}</p>
      <p>Votes: {vote[mostVoteIndex]}</p>
    </div>
  );
};

export default PopularAnec;
