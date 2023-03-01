const Persons = ({ persons }) => {
  return (
    <div>
      <div>
        {persons.map((person, idx) => {
          return (
            <p key={idx}>
              {person.name}, {person.number}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Persons;
