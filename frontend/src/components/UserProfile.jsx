import React, { useEffect, useState } from "react";
import api from "../api";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api
      .get("/profile/")
      .then((response) => {
        if (response.data.length > 0) {
          setProfile(response.data[0]);
        } else {
          setErrorMsg("No profile data found.");
        }
      })
      .catch(() =>
        setErrorMsg("Failed to load your profile. Please try again.")
      );
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

      {profile && (
        <>
          <img
            src={profile.profile_picture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />

          <div className="mb-4">
            <h2 className="font-semibold">Bio</h2>
            <p>{profile.bio || "No bio available."}</p>
          </div>

          <h2 className="text-xl font-semibold mt-8">My Progress</h2>
          <ul className="list-disc ml-6 mt-2">
            {profile.progress?.length > 0 ? (
              profile.progress.map((p) => (
                <li key={p.id}>
                  {p.lesson_title} - {p.progress_percentage}%{" "}
                  {p.completed ? "✅" : "❌"}
                </li>
              ))
            ) : (
              <li>No progress yet.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserProfile;

