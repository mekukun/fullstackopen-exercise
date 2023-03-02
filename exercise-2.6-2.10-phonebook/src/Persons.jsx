import noteService from "./services/notes";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (id, name) => {
    const alertDelete = confirm(`Delete ${name}?`);
    if (alertDelete) {
      noteService.deleteThis(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <div>
        {persons.map((person) => {
          return (
            <div key={person.id}>
              <p>
                {person.name}, {person.number}
              </p>
              <button onClick={() => deletePerson(person.id, person.name)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Persons;
