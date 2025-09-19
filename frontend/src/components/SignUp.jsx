import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function SignUp(){

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

        try{



            const response = await api.post("user/register/", {username, password});

            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

            navigate("/lessons")


        }
        catch(err){
            setError("Signup failed.Try another username/email.")
            

        };
    }

      return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />

          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );




}
export default SignUp;