import React from "react";
import { authApi } from "../../../api";
import { Button } from "../../common";

export const SignOutBtn: React.FC = () => {
	return (
		<Button onClick={() => authApi.SignOut()} BtnClass={{ intent: "red" }}>
			Sign Out
		</Button>
	);
};

export default SignOutBtn;
