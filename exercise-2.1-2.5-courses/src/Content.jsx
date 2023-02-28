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
      {materials.map((material) => {
        return <Part key={material.id} content={material} />;
      })}
    </div>
  );
};

export default Content;
