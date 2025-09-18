import {useState} from "react"
import { useNavigate } from "react-router-dom"
import api from "./api"
import  {ACCESS_TOKEN, REFRESH_TOKEN} from "./constants"

export default function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
}

const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try{
        const response = await  api.post("token/", {username, password})
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)

        navigate("/home");

    } 
    catch(err){

        console.error(err)

        setError(err.response?.data?.detail  || "Login Failed.Check your Credentials.");
    }
}