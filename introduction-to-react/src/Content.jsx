const Part = ({ content }) => {
  return (
    <p>
      Part Name: {content.part} with {content.exercise}{" "}
      {content.exercise == 1 ? "exercise." : "exercises."}
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
