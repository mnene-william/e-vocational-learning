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
      .then((response) => setProfile(response.data[0]))
      .catch(() =>
        setErrorMsg("Failed to load your profile. Please try again later.")
      );
  }, []);

  const getAvatarUrl = (customUrl) => {
    return customUrl || "/default-avatar.png";
  };

  const userProgress =
    profile?.progress?.filter((p) => p.progress_percentage > 0 || p.completed) ||
    [];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-6 flex justify-center">
        <Navbar />
    
      <div className="w-full md:w-3/4">
      
        {errorMsg && (
          <p className="mb-6 text-red-600 font-medium text-center">{errorMsg}</p>
        )}



        {profile && (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg rounded-xl p-6 mb-10 text-white">
              <img
                src={getAvatarUrl(profile.profile_picture)}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{profile.username}</h1>
                <p className="text-indigo-100">{profile.email}</p>
                {profile.bio && <p className="mt-2 text-indigo-200">{profile.bio}</p>}

                <div className="mt-4 flex gap-4 flex-wrap">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Lessons Started: {userProgress.length}
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Completed: {userProgress.filter((p) => p.completed).length}
                  </div>
                </div>
              </div>
            </div>

            {/* My Progress Section */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Progress</h2>
            {userProgress.length === 0 ? (
              <p className="text-gray-500 text-center">No progress yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {userProgress.map((p) => (
                  <div
                    key={p.lesson}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">{p.lesson_title}</h3>
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
                          p.completed
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-gradient-to-r from-indigo-400 to-indigo-600"
                        }`}
                      ></motion.div>
                    </div>

                    {p.completed && (
                      <p className="mt-2 text-green-600 font-semibold flex items-center gap-1">
                        ✅ Completed
                      </p>
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















