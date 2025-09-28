import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import Navbar from "./Navbar";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api
      .get("/profile/")
      .then((response) => {
        // Handle array or object response
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setProfile(data || {}); // fallback to empty object
      })
      .catch(() =>
        setErrorMsg("Failed to load your profile. Please try again later.")
      );
  }, []);

  const getAvatarUrl = (customUrl) => customUrl || "/default-avatar.png";

  // Combine lesson progress with quiz progress
  const lessonProgress =
    profile?.progress?.filter((p) => p.progress_percentage > 0 || p.completed) || [];
  const quizProgress = profile?.quizzes || [];

  // Merge and sort by latest activity (optional)
  const combinedProgress = [
    ...lessonProgress.map((p) => ({ ...p, type: "lesson" })),
    ...quizProgress.map((q) => ({ ...q, type: "quiz" })),
  ].sort(
    (a, b) =>
      new Date(b.last_opened || b.completed_at || 0) -
      new Date(a.last_opened || a.completed_at || 0)
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-6 flex justify-center">
      <Navbar />

      <div className="w-full md:w-3/4">
        {errorMsg && (
          <p className="mb-6 text-red-600 font-medium text-center">{errorMsg}</p>
        )}

        {!profile ? (
          <p className="text-center text-gray-500 mt-10">Loading your profile...</p>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg rounded-xl p-6 mb-10 text-white">
              <img
                src={getAvatarUrl(profile.profile_picture)}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{profile.username || "New User"}</h1>
                <p className="text-indigo-100">{profile.email || "No email set"}</p>
                {profile.bio && <p className="mt-2 text-indigo-200">{profile.bio}</p>}

                <div className="mt-4 flex gap-4 flex-wrap">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Lessons Started: {lessonProgress.length}
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Completed: {lessonProgress.filter((p) => p.completed).length}
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Combined Progress Section */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Progress</h2>
            {combinedProgress.length === 0 ? (
              <p className="text-gray-500 text-center">
                Welcome! You haven't started any lessons or quizzes yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {combinedProgress.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {p.type === "lesson" ? p.lesson_title : p.quiz_title || "Quiz"}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {p.type === "lesson"
                          ? `${p.progress_percentage ?? 0}%`
                          : `Score: ${p.score ?? 0}/${p.total_questions ?? 0}`}
                      </span>
                    </div>

                    {p.type === "lesson" && (
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.progress_percentage ?? 0}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`h-4 rounded-full ${
                            p.completed
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : "bg-gradient-to-r from-indigo-400 to-indigo-600"
                          }`}
                        ></motion.div>
                        {p.completed && (
                          <p className="mt-2 text-green-600 font-semibold flex items-center gap-1">
                            Completed
                          </p>
                        )}
                      </div>
                    )}

                    {p.type === "quiz" && (
                      <div className="mt-2 p-2 bg-indigo-50 rounded-lg text-indigo-700 font-medium">
                        {p.passed ? "Passed" : "Not taken yet"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

















