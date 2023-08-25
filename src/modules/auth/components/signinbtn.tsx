import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/";

export const SignInBtn: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Button
			BtnClass={{ intent: "emerald" }}
			onClick={() => navigate("/auth/signin")}
		>
			Sign In
		</Button>
	);
};

export default SignInBtn;
