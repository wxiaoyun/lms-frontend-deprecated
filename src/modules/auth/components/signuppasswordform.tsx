import React from "react";
import * as Form from "@radix-ui/react-form";

export const SignUpPasswordForm: React.FC<{
  userData: UserCreateForm;
  setUserData: React.Dispatch<React.SetStateAction<UserCreateForm>>;
}> = ({ userData, setUserData }) => {
  return (
    <div className="flex flex-col gap-6">
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
            value={userData.password}
            placeholder="Please enter your password"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  password: e.target.value,
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="w-96 grid gap-2" name="confirmPassword">
        <div className="flex flex-row gap-2">
          <Form.Label>Confirm password</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please re-enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="password"
            required
            value={userData.passwordConfirmation}
            placeholder="Please re-enter your password"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  passwordConfirmation: e.target.value,
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>
    </div>
  );
};

export default SignUpPasswordForm;
