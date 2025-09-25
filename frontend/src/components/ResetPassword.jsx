import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

function ResetPassword(){

     const [password, setPassword] = useState("")
     const [confirmPassword, setConfirmPassword] = useState("")
     const [successMsg, setSuccessMsg] = useState("")
     const [errorMsg, setErrorMsg] = useState("")



     const navigate = useNavigate()
     const [searchParams] = useSearchParams()

     const token = searchParams.get("token")



     const handleResetPassword = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
          
            setErrorMsg("The passwords you entered do not match.")

            return;
        }

        try{
            
            await api.post("/password_reset/confirm/", {token, password})

            setSuccessMsg("Your password was reset successfully!")

            setTimeout(() => navigate("/login"), 2000)
        }
        catch(err){
            if (err.response && err.response.data?.email) {

               setErrorMsg(err.response.data.email[0])

            }

             else{

                setErrorMsg("Something went wrong. Please try again.")
            }
}
        }
     



return(


    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

              {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

              {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

        <input

          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />


        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />


        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">

          Reset Password

        </button>

      </form>
    </div>

)



}
export default ResetPassword;