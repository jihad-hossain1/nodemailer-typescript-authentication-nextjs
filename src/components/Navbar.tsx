"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  justify-center ">
      <div className="flex gap-7 w-fit px-10 border lg:px-20 py-2 rounded mt-2 border-green-800 shadow hover:shadow-md bg-green-800">
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}>login</Link>
        <Link href={"/profile"}>Profile</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
