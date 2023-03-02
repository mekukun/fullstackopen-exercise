import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import noteService from "./services/notes";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);

  const submitBehaviour = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)

    if (!persons.some((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      noteService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    noteService.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Contact List</h3>
      <Persons persons={persons} />
      <h3>Add New Contact</h3>
      <PersonForm
        submitBehaviour={submitBehaviour}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Filter</h3>
      <Filter
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        persons={persons}
      />
    </div>
  );
};

export default App;
