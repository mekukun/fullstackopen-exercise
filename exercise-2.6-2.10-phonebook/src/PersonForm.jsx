import { useState } from "react";
import noteService from "./services/notes";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const submitBehaviour = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)

    const searchedPerson = persons.find((person) => person.name === newName);

    if (!persons.some((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      noteService.createThis(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });
    } else if (searchedPerson.number !== newNumber) {
      const confirmChange = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmChange) {
        const changedPerson = { ...searchedPerson, number: newNumber };

        noteService
          .updateThis(searchedPerson.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== searchedPerson.id ? person : response
              )
            );
          });
      }
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form onSubmit={submitBehaviour}>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Phone Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
