import { useState } from "react";
import api from "../api"; // 

export default function Reviews({ lessonId, reviews = [] }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reviews/", {
        lesson: lessonId, 
        content,
        rating,
      });

      setContent("");
      setRating(0);
      
      window.location.reload(); 
    } catch (err) {

      console.error("Error submitting review:", err.response?.data || err.message);
    }
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-10">

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Reviews ({reviews.length})
      </h2>


      <ul className="space-y-4 mb-6">
        {reviews.length > 0 ? (

          reviews.map((rev) => (

            <li
              key={rev.id}
              className="border-b border-gray-200 pb-3 last:border-none"
            >

              <strong className="text-indigo-600">{rev.user.username}</strong>{" "}
              <span className="text-yellow-500">({rev.rating} stars)</span>

              <p className="text-gray-700 mt-1">{rev.content}</p>

            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"

          placeholder="Write your review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-lg p-2 text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}






