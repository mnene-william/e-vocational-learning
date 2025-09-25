import React, { useEffect, useState } from "react";
import api from "../api";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api
      .get("/profile/")
      .then((response) => {
        setProfile(response.data[0]);
      })
      .catch(() =>
        setErrorMsg("Failed to load your profile. Please try again later.")
      );
  }, []);

  const getAvatarUrl = (username) => {
    return profile?.profile_picture
      ? profile.profile_picture
      : `https://robohash.org/${username}.png?size=150x150`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Profile
        </h1>

        {errorMsg && (
          <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        {profile && (
          <div className="flex flex-col items-center">
            <img
              src={getAvatarUrl(profile.username)}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-300 mb-4 shadow-md"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              {profile.username}
            </h2>
            <p className="text-gray-500 mb-4">{profile.email}</p>
            {profile.bio && (
              <p className="text-center text-gray-600 mb-6 px-4">{profile.bio}</p>
            )}

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              My Progress
            </h3>
            {profile.progress.length > 0 ? (
              <ul className="w-full max-w-md space-y-2">
                {profile.progress.map((p) => (
                  <li
                    key={p.id}
                    className={`flex justify-between items-center px-4 py-2 rounded shadow-sm ${
                      p.completed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <span className="font-medium">{p.lesson_title}</span>
                    <span
                      className={`font-semibold ${
                        p.completed ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {p.progress_percentage}% {p.completed ? "✅" : "❌"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No progress yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;











