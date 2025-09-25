import React, { useEffect, useState } from "react";

function UserProfile(){

    const [profile, setProfile] = useState(null)
    const [bio, setBio] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    useEffect(() => {
        api.get("/profile")
           .then((response) => {

            setProfile(response.data[0]);

            setBio(response.data[0].bio || "")
           })

           .catch(() => setMessage("Failed to load your profile. Please try again"))

    }, [])
  

    const  handleProfileUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("bio", bio)


        if(profilePicture) {

            formData.append("profile_picture", profilePicture)
        }


        try{

            await api.put(`/profile/${profile.id}/`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })

            setSuccessMsg("Your profile has been updatd successfully!")
        }
        catch{

            setErrorMsg("Failed to update your profile!")
        }
    }

    return(

        <>
          <div>


          </div>
        
        
        </>
    )


}
export default UserProfile;