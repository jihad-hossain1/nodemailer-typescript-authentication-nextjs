"use server";

import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/api/users/user");
    console.log(res?.data);
    return res?.data;
  } catch (error: any) {
    return new Error(error);
  }
};
