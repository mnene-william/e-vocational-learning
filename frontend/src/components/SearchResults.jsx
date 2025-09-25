import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await api.get(`/search/?q=${encodeURIComponent(query)}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((item) => (
            <li key={item.id} className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
              {item.title} <span className="text-gray-500">({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
