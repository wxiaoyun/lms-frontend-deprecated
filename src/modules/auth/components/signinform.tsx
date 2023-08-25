import React from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";

import { Button } from "../../common";
import { NotifyError } from "../../../util";
import { userSchema } from "../../../schema";
import { authApi } from "../../../api";

export const SignInForm: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!userSchema.isValidSync({ email, password })) {
			NotifyError("Invalid email or password");
			return;
		}

		authApi.SignIn({ email, password });
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
						value={email}
						placeholder="Please enter your email"
						onChange={(e) => setEmail(e.target.value)}
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
