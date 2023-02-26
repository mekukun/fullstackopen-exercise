const Part = ({ content }) => {
  return (
    <p>
      Part Name: {content.name} with {content.exercises}{" "}
      {content.exercises == 1 ? "exercise." : "exercises."}
    </p>
  );
};

const Content = ({ materials }) => {
  return (
    <div>
      <Part content={materials[0]} />
      <Part content={materials[1]} />
      <Part content={materials[2]} />
    </div>
  );
};

export default Content;
