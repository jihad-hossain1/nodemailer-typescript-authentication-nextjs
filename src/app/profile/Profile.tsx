"use client";

import { sendEmail } from "@/common/sendMail";
import { UserResponse } from "@/type/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserProfile = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const getUserDetails = async () => {
    const res = await axios.get(`/api/users/user`);
    // console.log(res.data);
    console.log("🚀 ~ getUserDetails ~ res:", res)
    setData(res.data.data);
  };

  const sendVerificationEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/send-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.email,
          emailType: "VERIFY",
          userId: data?._id,
        }),
      });
      
      const result = await response.json();

      setLoading(false);

      console.log("🚀 ~ sendVerificationEmail ~ result:", result)
      
    } catch(error){
      console.error((error as Error).message);
    }
  }
  return (
    <div>
      <div>
        <button
          onClick={getUserDetails}
          className="border w-fit px-4 py-1 text-sm"
        >
          show user details
        </button>

        {data && (
          <div className="flex flex-col gap-4">
            <h4> ProfileId: {data ? data?._id : ""}</h4>
            <h4>Name: {data?.fullname}</h4>
            <h4>Email: {data?.email}</h4>
            <h4>
              Your Account:
              {data?.isVerfied ? (
                <span className="ml-4 bg-green-700 px-5 py-1  rounded">
                  verified
                </span>
              ) : (
                <div className="flex gap-2 items-center">
                <span className="ml-4 bg-pink-700 px-5 py-1  rounded">
                  not verify
                </span>
                <button onClick={sendVerificationEmail} className="rounded w-fit px-4 py-1 text-sm bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow">Send Verification Email {loading ? "...": "" } </button>
                </div>
              )}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
