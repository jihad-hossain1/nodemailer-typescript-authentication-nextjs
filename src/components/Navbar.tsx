import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex  justify-center ">
      <div className="flex gap-7 w-fit px-10 border lg:px-20 py-2 rounded mt-2 border-green-800 shadow hover:shadow-md bg-green-800">
        <Link href={"/"}>Home</Link>
        <Link href={"/authentication"}>login</Link>
      </div>
    </div>
  );
};

export default Navbar;
