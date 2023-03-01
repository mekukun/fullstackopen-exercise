const Filter = ({ newFilter, setNewFilter, persons }) => {
  const filtered = persons.filter(
    (person) => person.name.toLowerCase() === newFilter.toLowerCase()
  );

  return (
    <div>
      <form>
        Filter:{" "}
        <input
          value={newFilter}
          onChange={(e) => setNewFilter(e.target.value)}
        />
      </form>
      {filtered.map((n, idx) => {
        return (
          <p key={idx}>
            {n.name}, {n.number}
          </p>
        );
      })}
    </div>
  );
};

export default Filter;
