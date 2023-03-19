import React, { useState } from "react"
import { debounce } from "debounce";
import axios from "axios";

export const QueryProtein = ({onPDBSelection}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch protein data
  const fetchProteinData = async (searchTerm) => {
    try {
      const queryJSON = {
        type: "basic",
        suggest: {
          text: searchTerm,
          attributes: ["rcsb_entry_container_identifiers.entry_id"],
          size: 10
        }
      };

      const response = await axios.get(
        `https://search.rcsb.org/rcsbsearch/v2/suggest?json=${encodeURIComponent(
          JSON.stringify(queryJSON)
        )}`
      );

      if (!response.data) return []

        const results = response.data.suggestions["rcsb_entry_container_identifiers.entry_id"].map((item) => ({
          id: item.text.replace(/<em>|<\/em>/g, ""),
          score: item.score,
      }));
      
      setSuggestions(results);

      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching protein data:", error);
    }
  };


  // Debounce the fetchProteinData function
  const debouncedFetchProteinData = debounce(fetchProteinData, 500);

  // Handle query change
  const handleQueryChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    debouncedFetchProteinData(searchTerm);
  };

  // Handle protein selection
  const handleProteinSelect = (e) => {
    const selectedProteinId = e.target.value;
    console.log("Selected protein ID:", selectedProteinId);
    onPDBSelection(selectedProteinId);
  };

  return (
    <div className="query-protein">
      <input
        type="text"
        placeholder="Search for a protein"
        value={query}
        onChange={handleQueryChange}
      />
      <select onChange={handleProteinSelect}>
        {suggestions.map((suggestion) => (
          <option key={suggestion.id} value={suggestion.id}>
            {suggestion.id}
          </option>
        ))}
      </select>
    </div>
  );
};

