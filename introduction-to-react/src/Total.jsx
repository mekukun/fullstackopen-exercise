const Total = (props) => {
  let exerciseCount = 0;
  props.materials.forEach((content) => {
    exerciseCount += content.exercises;
  });
  return (
    <div>
      <p>Number of exercises: {exerciseCount}</p>
    </div>
  );
};

export default Total;
