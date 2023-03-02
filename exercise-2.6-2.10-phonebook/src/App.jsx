import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import noteService from "./services/notes";

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    noteService.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Contact List</h3>
      <Persons persons={persons} setPersons={setPersons} />
      <h3>Add New Contact</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
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
