import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);

  const submitBehaviour = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)

    if (!persons.some((person) => person.name === newName)) {
      const personsCopy = [...persons];
      setPersons(personsCopy.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
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
