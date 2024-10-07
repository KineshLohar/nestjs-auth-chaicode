"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();

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
      <hr />
      <button
        onClick={logout}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
      >
        Logout
      </button>
    </div>
  );
}
