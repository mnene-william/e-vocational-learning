import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api
      .get("/profile/")
      .then((response) => setProfile(response.data[0]))
      .catch(() =>
        setErrorMsg("Failed to load your profile. Please try again later.")
      );
  }, []);

  // Use custom avatar if exists, else use generic placeholder
  const getAvatarUrl = (customUrl) => {
    return customUrl || "/default-avatar.png"; // Make sure default-avatar.png is in public folder
  };

  // Only show lessons the user has started or completed
  const userProgress =
    profile?.progress?.filter(
      (p) => p.progress_percentage > 0 || p.completed
    ) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {errorMsg && (
        <p className="mb-4 text-red-600 font-medium text-center">{errorMsg}</p>
      )}

      {profile && (
        <>
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow rounded-lg p-6 mb-8">
            <img
              src={getAvatarUrl(profile.profile_picture)}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-indigo-500 object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <p className="text-gray-600">{profile.email}</p>
              {profile.bio && <p className="mt-2 text-gray-800">{profile.bio}</p>}
            </div>
          </div>

          {/* Progress Cards */}
          <h2 className="text-2xl font-semibold mb-4">My Progress</h2>
          {userProgress.length === 0 ? (
            <p className="text-gray-500">No progress yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {userProgress.map((p) => (
                <div
                  key={p.lesson}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{p.lesson_title}</h3>
                    <span className="text-sm text-gray-600">
                      {p.progress_percentage ?? 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress_percentage ?? 0}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-4 rounded-full ${
                        p.completed ? "bg-green-500" : "bg-indigo-500"
                      }`}
                    ></motion.div>
                  </div>
                  {p.completed && (
                    <p className="mt-2 text-green-600 font-semibold">
                      Completed ✅
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserProfile;














