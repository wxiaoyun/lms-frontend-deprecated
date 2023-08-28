import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { SignOutBtn, SignInBtn } from "../../";

export const Nav: React.FC = () => {
  const app = useSelector((state: RootState) => state.app);

  return (
    <div className="sticky top-0 z-10">
      <div className="w-full min-h-8 p-3 flex flex-row items-center justify-between bg-slate-200">
        <Link to={"/"} className="text-3xl text-sky-800 font-bold">
          Library
        </Link>
        {!app.isLoggedIn ? <SignInBtn /> : <SignOutBtn />}
      </div>
    </div>
  );
};

export default Nav;
