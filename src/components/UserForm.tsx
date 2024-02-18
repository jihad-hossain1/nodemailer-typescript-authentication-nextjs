"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const UserForm = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [btndisabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(`/api/users/login`, user);

      console.log("login successfull: ", response.data);

      router.push("/");
    } catch (error: any) {
      console.log(error.response);
      setErrors(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section>
        <div className="max-w-md flex flex-col gap-4 mx-auto">
          <div className="text-pink-600 text-sm">{errors ? errors : ""}</div>
          <input
            placeholder="email"
            value={user.email}
            type="email"
            name="email"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            type="password"
            name="password"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
          />

          <button
            disabled={btndisabled}
            onClick={handleLogin}
            type="submit"
            className="bg-green-600 border border-green-800"
          >
            {loading ? "loading...." : "Login"}
          </button>
          <Link href={"/login/register"} className="text-blue-500">
            create an new register
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UserForm;
