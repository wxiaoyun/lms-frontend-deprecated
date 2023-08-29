import React from "react";
import * as Form from "@radix-ui/react-form";

export const SignUpParticularsForm: React.FC<{
  userData: UserCreateForm;
  setUserData: React.Dispatch<React.SetStateAction<UserCreateForm>>;
}> = ({ userData, setUserData }) => {
  return (
    <div className="flex flex-col gap-6">
      <Form.Field className="w-96 grid gap-2" name="fullname">
        <div className="flex flex-row gap-2">
          <Form.Label>Full Name</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your full name
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(val) => val.length < 3}
          >
            Please provide a valid full name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="text"
            required
            value={userData.person_attributes.full_name}
            placeholder="Please enter your full name"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  person_attributes: {
                    ...u.person_attributes,
                    full_name: e.target.value,
                  },
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="w-96 grid gap-2" name="preferredname">
        <div className="flex flex-row gap-2">
          <Form.Label>Preferred Name</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your preferred name
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(preferredName) => preferredName.length < 3}
          >
            Please provide a valid preferred name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="text"
            required
            value={userData.person_attributes.preferred_name}
            placeholder="Please enter your preferred name"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  person_attributes: {
                    ...u.person_attributes,
                    preferred_name: e.target.value,
                  },
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="w-96 grid gap-2" name="preferredname">
        <div className="flex flex-row gap-2">
          <Form.Label>Language Preferrance</Form.Label>
          <Form.Message className="text-red-600" match="valueMissing">
            Please enter your language preferrance
          </Form.Message>
          <Form.Message
            className="text-red-600"
            match={(preferredName) => preferredName.length < 2}
          >
            Please provide a valid preferred name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full rounded-md p-1"
            type="text"
            required
            value={userData.person_attributes.language_preference}
            placeholder="Please enter your language preferrance"
            onChange={(e) =>
              setUserData((u) => {
                return {
                  ...u,
                  person_attributes: {
                    ...u.person_attributes,
                    language_preference: e.target.value,
                  },
                };
              })
            }
          />
        </Form.Control>
      </Form.Field>
    </div>
  );
};

export default SignUpParticularsForm;
