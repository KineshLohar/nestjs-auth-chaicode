"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignUp(){
    const router = useRouter()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username : ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(userData.email.length > 0 && userData.password.length > 0 && userData.username.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[userData])

    const handleSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", userData)
            console.log("Signup success", response.data)
            toast.success("Signup success")
            router.push("/login")
        } catch (error) {
            console.log("Error in signup", error)
            toast.error("Error in signup")
        } finally {
            setLoading(false)
        }
    }
    
    return(
        <div className="flex flex-col items-center justify-center h-screen gap-4">

            <h1 className="text-2xl font-bold">{ loading ? "Loading..." : "SignUp"}</h1>
            <div className="flex flex-col gap-2 items-start justify-start">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={(e) => setUserData({...userData, username : e.target.value})} placeholder="Username" value={userData.username} className="border border-gray-300 rounded-md p-2 text-black" />
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" onChange={(e) => setUserData({...userData, email : e.target.value})} value={userData.email} className="border border-gray-300 rounded-md p-2 text-black" />
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
                <label htmlFor="password">Username</label>
                <input id="password" type="password" onChange={(e) => setUserData({...userData, password : e.target.value})} placeholder="Password" value={userData.password} className="border border-gray-300 rounded-md p-2 text-black" />
            </div>
            <button  onClick={handleSignUp} disabled={buttonDisabled} className="bg-blue-500 text-white rounded-md p-2 px-4">{buttonDisabled ? "Please fill all fields" : "SignUp"}</button>
            <Link href='/login'>Login</Link>
        </div>
    )
}