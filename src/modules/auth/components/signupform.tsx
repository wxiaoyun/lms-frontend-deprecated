import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Form from "@radix-ui/react-form";
import * as Tabs from "@radix-ui/react-tabs";

import { Button } from "../../common";
import {
  SignInBtn,
  SignUpAccountForm,
  SignUpParticularsForm,
  SignUpPasswordForm,
} from "./";
import { authApi } from "../../../api";

export const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userCreateData, setUserCreateData] = React.useState<UserCreateForm>({
    username: "",
    email: undefined,
    password: "",
    passwordConfirmation: "",
    person_attributes: {
      full_name: "",
      preferred_name: "",
      language_preference: "",
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authApi.Signup(userCreateData, dispatch, navigate);
  };

  return (
    <Form.Root
      className="w-auto h-auto p-6 bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all grid gap-6"
      onSubmit={handleSubmit}
    >
      <Tabs.Root className="flex flex-col gap-6" defaultValue="account">
        <Tabs.List className="flex">
          <Tabs.Trigger
            className="flex-1 flex items-center justify-center hover:text-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none transition-all"
            value="account"
          >
            Account
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex-1 flex items-center justify-center hover:text-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none transition-all"
            value="particulars"
          >
            Personal Particulars
          </Tabs.Trigger>

          <Tabs.Trigger
            className="flex-1 flex items-center justify-center hover:text-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none transition-all"
            value="password"
          >
            Password
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="account">
          <SignUpAccountForm
            userData={userCreateData}
            setUserData={setUserCreateData}
          />
        </Tabs.Content>

        <Tabs.Content value="particulars">
          <SignUpParticularsForm
            userData={userCreateData}
            setUserData={setUserCreateData}
          />
        </Tabs.Content>

        <Tabs.Content value="password">
          <SignUpPasswordForm
            userData={userCreateData}
            setUserData={setUserCreateData}
          />
        </Tabs.Content>
      </Tabs.Root>

      <div className="flex flex-row justify-between">
        <Form.Submit asChild>
          <Button BtnClass={{ intent: "teal" }}>Sign Up</Button>
        </Form.Submit>
        <SignInBtn />
      </div>
    </Form.Root>
  );
};

export default SignUpForm;
