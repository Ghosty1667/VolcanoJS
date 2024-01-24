import { useState } from "react";

export default function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");

  return (
    <div>
      <input
        aria-labelledby="search-button"
        type="search"
        name="search"
        id="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
      />
      <button id="search-button" type="button" onClick={() => props.onSubmit(innerSearch)}>
        Search
      </button>
    </div>
  );
}

