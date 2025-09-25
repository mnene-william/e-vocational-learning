import React, { useEffect, useState } from "react";

function UserProfile(){

    const [profile, setProfile] = useState(null)
    const [bio, setBio] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)
    const [message, setMessage] = useState("")


    useEffect(() => {
        api.get("/profile")
           .then((response) => {

            setProfile(response.data[0]);

            setBio(response.data[0].bio || "")
           })

           .catch(() => setMessage("Failed to load your profile. Please try again"))
           
    }, [])



}
export default UserProfile;