"use client";

interface User {
  _id: string;
}

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Profile = () => {
  const [data, setData] = React.useState(null);
  const router = useRouter();

  const getUserDetails = async () => {
    const res = await axios.get(`/api/users/user`);
    // console.log(res.data);
    setData(res.data.data);
  };

  //   console.log(data);
  return (
    <div>
      <button
        onClick={getUserDetails}
        className="border w-fit px-4 py-1 text-sm"
      >
        show user details
      </button>

      {data && (
        <div className="flex flex-col gap-4">
          <h4> ProfileId: {data ? data._id : ""}</h4>
          <h4>Name: {data?.fullname}</h4>
          <h4>Email: {data?.email}</h4>
          <h4>
            Your Account:
            {data?.isVerfied ? (
              <span className="ml-4 bg-green-700 px-5 py-1  rounded">
                verified
              </span>
            ) : (
              <span className="ml-4 bg-pink-700 px-5 py-1  rounded">
                not verify
              </span>
            )}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Profile;