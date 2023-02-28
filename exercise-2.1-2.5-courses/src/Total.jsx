const Total = ({ materials }) => {
  let exerciseCount = materials.reduce((accumulator, material) => {
    return accumulator + material.exercises;
  }, 0);

  return (
    <div>
      <p>Number of exercises: {exerciseCount}</p>
    </div>
  );
};

export default Total;
