import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q") || "";
  const [skills, setSkills] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search/?q=${query}`);
        setSkills(res.data.skills);
        setLessons(res.data.lessons);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {skills.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition relative"
              >
                <div className="h-32 w-full bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-500 font-bold text-xl">{skill.title[0]}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.description || "No description available."}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {lessons.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition relative"
              >
                <div className="h-32 w-full bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-500 font-bold text-xl">{lesson.title[0]}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.description || "No description available."}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {skills.length === 0 && lessons.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No results found for "{query}".</p>
      )}
    </div>
  );
}

export default SearchResults;
