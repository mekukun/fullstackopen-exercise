import { useState } from "react";
import noteService from "./services/notes";
import Notification from "./Notification";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [noti, setNoti] = useState(null);

  const submitBehaviour = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)

    const searchedPerson = persons.find((person) => person.name === newName);

    if (!persons.some((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      noteService
        .createThis(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNoti({ text: `Added ${newName}`, style: true });
          setTimeout(() => {
            setNoti(null);
          }, 3000);
        })
        .catch((err) => {
          setNoti({
            text: err.response.data.error,
            style: false,
          });
          setTimeout(() => {
            setNoti(null);
          }, 3000);
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
          })
          .catch((err) => {
            setNoti({
              text: `Information of ${searchedPerson.name} has already been removed from server`,
              style: false,
            });
            setTimeout(() => {
              setNoti(null);
            }, 3000);
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
      <Notification noti={noti} />
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
