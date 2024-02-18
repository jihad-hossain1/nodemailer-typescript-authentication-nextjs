"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleRegister = () => {};
  return (
    <div>
      <section>
        <form className="max-w-md flex flex-col gap-4 mx-auto">
          <input
            placeholder="email"
            type="email"
            name="email"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
          />

          <button
            onClick={handleRegister}
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
