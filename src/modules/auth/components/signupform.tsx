import React from "react";
import * as Form from "@radix-ui/react-form";
import * as yup from "yup";

import { Button } from "../../common";
import SignInBtn from "./signinbtn";
import { NotifyError } from "../../../util";
import { userSignUpSchema } from "../../../schema";
import { authApi } from "../../../api";

export const SignUpForm: React.FC = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let hasError = false;
		try {
			userSignUpSchema.validateSync(
				{
					username,
					password,
					passwordConfirmation,
				},
				{ abortEarly: false },
			);
		} catch (err) {
			hasError = true;
			if (err instanceof yup.ValidationError) {
				for (const e of err.inner) {
					NotifyError(e.message);
				}
			}
		}

		if (hasError) return;
		authApi.Signup({ username, password });
	};

	return (
		<Form.Root
			className="w-auto h-auto p-6 bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all grid gap-6"
			onSubmit={handleSubmit}
		>
			<Form.Field className="w-96 grid gap-2" name="email">
				<div className="flex flex-row gap-2">
					<Form.Label>Email</Form.Label>
					<Form.Message className="text-red-600" match="valueMissing">
						Please enter your email
					</Form.Message>
					<Form.Message className="text-red-600" match="typeMismatch">
						Please provide a valid email
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input
						className="w-full rounded-md p-1"
						type="email"
						required
						value={username}
						placeholder="Please enter your email"
						onChange={(e) => setUsername(e.target.value)}
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
						value={passwordConfirmation}
						placeholder="Please re-enter your password"
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				</Form.Control>
			</Form.Field>
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
