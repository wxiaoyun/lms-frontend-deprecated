import * as yup from "yup";

// allowed characters: a-z, A-Z, 0-9, !@#$%^&*
const passwordRules =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,32}$/;

export const userSchema = yup.object().shape({
	email: yup.string().email().required("Email is required"),
	password: yup.string().min(8).max(32).required("Password is required"),
});

export const userSignInSchema = yup.object().shape({
	id: yup.number().positive().integer().required("ID is required"),
	email: yup.string().email().required("Email is required"),
});

export const userSignUpSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8)
		.max(32)
		.matches(passwordRules, { message: "Please create a stronger password" })
		.required(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required(),
});
