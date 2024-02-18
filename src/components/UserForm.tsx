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

  const handleRegister = (e) => {
    e.preventDefault();
    //
  };
  return (
    <div>
      <h4>User Register</h4>
      <section>
        <form onSubmit={handleRegister}>
          <input type="text" name="" id="" />
        </form>
      </section>
    </div>
  );
};

export default UserForm;
