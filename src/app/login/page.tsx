'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email : '',
        password : ''
    })
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", userData)
            console.log(response)
            router.push("/profile")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(userData.email.length > 0 && userData.password.length > 0){
            setButtonDisabled(false)
        }
    },[userData.email, userData.password])

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">{ loading ? "Loading..." : "Login"}</h1>
            <div className="flex flex-col gap-2 items-start justify-start">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={(e) => setUserData({...userData, email : e.target.value})} placeholder="Email" value={userData.email} className="border border-gray-300 rounded-md p-2 text-black" />
            </div>
            <div className="flex flex-col gap-2 items-start justify-start">
                <label htmlFor="password">Username</label>
                <input id="password" type="password" onChange={(e) => setUserData({...userData, password : e.target.value})} placeholder="Password" value={userData.password} className="border border-gray-300 rounded-md p-2 text-black" />
            </div>
            <button onClick={handleLogin} disabled={loading} className="bg-blue-500 text-white rounded-md p-2 px-4">{loading ? "Loading..." : "Login"}</button>
            <Link href='/signup'>Register</Link>
        </div>
    )
}