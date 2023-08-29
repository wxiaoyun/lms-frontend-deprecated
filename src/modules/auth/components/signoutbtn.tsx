import React from "react";
import { authApi } from "../../../api";
import { Button } from "../../common";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const SignOutBtn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => authApi.SignOut(dispatch, navigate)}
      BtnClass={{ intent: "red" }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
