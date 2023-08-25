import React from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

export const Empty: React.FC<{ message: string }> = ({ message }) => {
	const navigate = useNavigate();
	return (
		<div className="p-6 bg-slate-100 rounded-md shadow-md flex item">
			<h2 className="font-bold">{message}</h2>
			<Button
				BtnClass={{ intent: "invisible", shadow: "none" }}
				onClick={() => navigate(-1)}
			>
				Click to go back
			</Button>
		</div>
	);
};

export default Empty;
