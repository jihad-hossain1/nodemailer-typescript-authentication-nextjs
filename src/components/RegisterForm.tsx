import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RegisterForm = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [btndisabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.fullname.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleRegister = (e: any) => {
    e.preventDefault();

    console.log(user);
  };
  return (
    <div>
      <section>
        <form className="max-w-md flex flex-col gap-4 mx-auto">
          <input
            placeholder="fullname"
            value={user.fullname}
            type="text"
            name="fullname"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
          />
          <input
            placeholder="username"
            value={user.username}
            type="text"
            name="username"
            className="bg-transparent border-green-600 border p-3 rounded-md"
            id=""
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
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

export default RegisterForm;
