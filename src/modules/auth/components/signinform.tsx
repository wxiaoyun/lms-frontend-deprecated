import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";

import { Button } from "../../common";
import { NotifyError } from "../../../util";
import {
  SigninWithEmailSchema,
  SigninWithUsernameSchema,
} from "../../../schema";
import { authApi } from "../../../api";
import {
  IsUsernameOrEmail,
  IsValidPassword,
  IsValidUsernameOrEmail,
  UsernameOrEmailType,
} from "../../../util/string";

export const ValidateCredentials = (
  usernameOrEmail: string,
  password: string,
): boolean => {
  if (!IsValidUsernameOrEmail(usernameOrEmail) || !IsValidPassword(password))
    return false;

  switch (IsUsernameOrEmail(usernameOrEmail)) {
    case UsernameOrEmailType.Email:
      return SigninWithEmailSchema.isValidSync({
        email: usernameOrEmail,
        password,
      });
    case UsernameOrEmailType.Username:
      return SigninWithUsernameSchema.isValidSync({
        username: usernameOrEmail,
        password,
      });
    default:
      return false;
  }
};

export const CredentialsToPayload = (
  usernameOrEmail: string,
  password: string,
): UserLogin => {
  switch (IsUsernameOrEmail(usernameOrEmail)) {
    case UsernameOrEmailType.Email:
      return {
        email: usernameOrEmail,
        password,
      };
    case UsernameOrEmailType.Username:
      return {
        username: usernameOrEmail,
        password,
      };
    default:
      return {
        username: usernameOrEmail,
        password,
      };
  }
};

export const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ValidateCredentials(usernameOrEmail, password)) {
      NotifyError("Invalid credentials");
      return;
    }

    authApi.SignIn(
      CredentialsToPayload(usernameOrEmail, password),
      dispatch,
      navigate,
    );
  };

  return (
    <Form.Root
      className="w-auto h-auto p-6 bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all grid gap-6"
      onSubmit={handleSubmit}
    >
      <Form.Field className="w-96 grid gap-2" name="text">
        <div className="flex flex-row gap-2">
          <Form.Label>Username or Email</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your email or username
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(str) => !IsValidUsernameOrEmail(str)}
          >
            Please a valid email or username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="text"
            required
            value={usernameOrEmail}
            placeholder="Please enter your email or username"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="w-96 grid gap-2" name="password">
        <div className="flex flex-row gap-2">
          <Form.Label>Password</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="password"
            required
            value={password}
            placeholder="Please enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Control>
      </Form.Field>

      <div className="flex flex-row justify-between">
        <Form.Submit asChild>
          <Button BtnClass={{ intent: "emerald" }}>Sign In</Button>
        </Form.Submit>
        <Button
          BtnClass={{ intent: "teal" }}
          onClick={() => navigate("/auth/signup")}
        >
          Sign Up
        </Button>
      </div>
    </Form.Root>
  );
};

export default SignInForm;
