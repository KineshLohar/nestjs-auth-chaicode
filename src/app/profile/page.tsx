"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const [userDetails, setUserDetails] = useState('')
  const router = useRouter();

  const getUserData = async () => {
    try {
      const response = await axios.get('/api/users/me')
      console.log("response of get user details ", response);
      setUserDetails(response.data.data?._id)
    } catch (error) {
      console.log("error while fetching user details", error);

    }
  }

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("User logged out");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome to your profile page</p>
      <h2>
        {
          !userDetails ? 
          <h2>No Data found</h2>
          :
          <Link href={`/profile/${userDetails}`} >To Profile</Link>
        }
      </h2>
      <hr />
      <button
        onClick={logout}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
      >
        Logout
      </button>

      <button
        onClick={getUserData}
        className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
      >
        Get User Details
      </button>
    </div>
  );
}
