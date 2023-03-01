const PersonForm = ({
  submitBehaviour,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
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
