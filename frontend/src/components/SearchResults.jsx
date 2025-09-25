import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function SearchResults() {
  const [lessons, setLessons] = useState([]);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    api
      .get(`/search/?q=${query}`)
      .then((res) => {
        setLessons(res.data.lessons || []);
        setSkill(res.data.skill || null);
      })
      .catch((err) => {
        console.error("Search error:", err);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return <p className="text-center mt-20">Loading results...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        {skill
          ? `Lessons for ${skill}`
          : lessons.length > 0
          ? `Search results for "${query}"`
          : `No lessons found for "${query}"`}
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gray-100 rounded-xl shadow-lg overflow-hidden transform transition hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="w-full aspect-[16/9] rounded-t-xl overflow-hidden">
              <img
                src={
                  lesson.placeholder_image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">
                Category: {lesson.category?.name || "Uncategorized"}
              </p>
              <button
                onClick={() => navigate(`/lessons/${lesson.id}`)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

