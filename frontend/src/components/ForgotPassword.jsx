import {useState} from "react";
import {motion} from "framer-motion";
import api from "../api";


function ForgotPassword(){

    const [email, setEmail] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)


    const handlePasswordReset = async (e) =>{

        e.preventDefault();
        setErrorMsg("")
        setSuccessMsg("")
        setLoading(true)

    

    try{
        await api.post("/auth/password-reset/", {email})

        setSuccessMsg("A password reset link has been sent!")

    }
    catch(err){
        console.error("An error occurred while resetting the password:", err)
        setErrorMsg("Hmm... something went wrong.Try again?")

    }
    finally{
        setLoading(false)
    }

}

return(
    <>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl backdrop-blur-lg">

            <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
                Forgot Password?
            </h2>


            {successMsg && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700">

                    {successMsg}
                    

                </motion.div>
            )}

            {errorMsg && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">

                    {errorMsg}

                </motion.div>
            )}

           
           <form onSubmit={handlePasswordReset} className="space-y-4">

                <motion.div>

                    <label className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border-gray-300 px-3 py-2 text-gray-900 shadow focus:border-indigo-500:ring focus:ring-indigo-300" />
                </motion.div>

                <motion.button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-400" disabled={loading}>
                    {loading ? "Sending...":"Send Reset Link"}

                </motion.button>

           </form>


            
            
            
        </motion.div>

       </div>
    
    </>

)


}
export default ForgotPassword;