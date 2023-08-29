import React from "react";
import * as Form from "@radix-ui/react-form";

import { IsValidEmail, IsValidUsername } from "../../../util/string";

export const SignUpAccountForm: React.FC<{
  userData: UserCreateForm;
  setUserData: React.Dispatch<React.SetStateAction<UserCreateForm>>;
}> = ({ userData, setUserData }) => {
  return (
    <div className="flex flex-col gap-6">
      <Form.Field className="w-96 grid gap-2" name="username">
        <div className="flex flex-row gap-2">
          <Form.Label>Username</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your username
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(val) => !IsValidUsername(val)}
          >
            Please provide a valid username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="text"
            required
            value={userData.username}
            placeholder="Please enter your username"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  username: e.target.value,
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="w-96 grid gap-2" name="email">
        <div className="flex flex-row gap-2">
          <Form.Label>Email</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(email) => !IsValidEmail(email)}
          >
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="email"
            required
            value={userData.email ?? ""}
            placeholder="Please enter your email"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  email: e.target.value,
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>
    </div>
  );
};

export default SignUpAccountForm;
