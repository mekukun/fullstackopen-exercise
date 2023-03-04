import countryService from "./services/country_names";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      const countries = response.map((n) => n.name.common);
      setCountry(countries);
    });
    console.log(country);
  }, []);

  const submitBehavior = (e) => {
    e.preventDefault(); //prevent reloading (default behavior)
  };

  return (
    <div className="App">
      <form onSubmit={submitBehavior}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
    </div>
  );
}

export default App;
