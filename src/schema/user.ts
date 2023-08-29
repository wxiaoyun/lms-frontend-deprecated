import * as yup from "yup";

import * as Constants from "../config/constants";

// allowed characters: a-z, A-Z, 0-9, !@#$%^&*
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,32}$/;

export const SigninWithEmailSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(Constants.MINIMUM_PASSWORD_LENGTH, "Password is too short")
    .max(Constants.MAXIMUM_PASSWORD_LENGTH, "Password is too long")
    .required("Password is required"),
});

export const SigninWithUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .min(Constants.MAXIMUM_USERNAME_LENGTH, "Username name is too short")
    .max(Constants.MAXIMUM_USERNAME_LENGTH, "Username name is too long")
    .required("Username is required"),
  password: yup
    .string()
    .min(Constants.MINIMUM_PASSWORD_LENGTH, "Password is too short")
    .max(Constants.MAXIMUM_PASSWORD_LENGTH, "Password is too long")
    .required("Password is required"),
});

export const userSignInSchema = yup.object().shape({
  id: yup.number().positive().integer().required("ID is required"),
  email: yup.string().email().required("Email is required"),
});

export const userSignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(Constants.MAXIMUM_USERNAME_LENGTH, "Username name is too short")
    .max(Constants.MAXIMUM_USERNAME_LENGTH, "Username name is too long")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
