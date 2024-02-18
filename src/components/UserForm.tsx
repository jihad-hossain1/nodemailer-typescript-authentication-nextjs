"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [btndisabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleLogin = (e: any) => {
    e.preventDefault();

    console.log(user);
  };
  return (
    <div>
      <section>
        <form className="max-w-md flex flex-col gap-4 mx-auto">
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
        </form>
      </section>
    </div>
  );
};

export default UserForm;
