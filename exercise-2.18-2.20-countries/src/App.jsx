import countryService from "./services/country_names";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountry(response);
    });
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredCountry([]);
    } else {
      const filtered = country.filter(
        (n) => n.name.common.slice(0, search.length) === search
      );
      setFilteredCountry(filtered);
    }
  }, [search]);

  const submitBehavior = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)
  };

  return (
    <div className="App">
      <form onSubmit={submitBehavior}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
      <div>
        {filteredCountry.length > 10 ? (
          <div>Too many matches. Specify another filter.</div>
        ) : filteredCountry.length === 1 ? (
          <div>
            <h1>{filteredCountry[0].name.common}</h1>
            <p>Capital: {filteredCountry[0].capital}</p>
            <p>Area: {filteredCountry[0].area}</p>
            <h4>Languages: </h4>
            <ul>
              {Object.values(filteredCountry[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={filteredCountry[0].flags.svg}
              alt={filteredCountry[0].name.common}
              width="100px"
            />
          </div>
        ) : (
          filteredCountry.map((n) => {
            return <div key={n.name.common}>{n.name.common}</div>;
          })
        )}
      </div>
    </div>
  );
}

export default App;
