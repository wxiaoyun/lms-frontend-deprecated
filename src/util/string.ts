import * as Constants from "../config/constants";

const EmailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PasswordReg =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,32}$/;

export const IsValidUsername = (username: string): boolean => {
  const length = Array.from(username).length;

  if (length < Constants.MINIMUM_USERNAME_LENGTH) {
    return false;
  }

  if (length > Constants.MAXIMUM_USERNAME_LENGTH) {
    return false;
  }

  return true;
};

export const IsValidEmail = (email: string): boolean => {
  return EmailReg.test(email);
};

export const IsValidPassword = (password: string): boolean => {
  const length = Array.from(password).length;

  if (length < Constants.MINIMUM_PASSWORD_LENGTH) {
    return false;
  }

  if (length > Constants.MAXIMUM_PASSWORD_LENGTH) {
    return false;
  }

  return PasswordReg.test(password);
};

export const IsValidUsernameOrEmail = (usernameOrEmail: string): boolean => {
  console.log(usernameOrEmail);
  if (IsValidEmail(usernameOrEmail)) return true;

  console.log("not valid email");
  if (IsValidUsername(usernameOrEmail)) return true;
  console.log("not valid username");
  return false;
};

export enum UsernameOrEmailType {
  Username,
  Email,
}

/**
 * This function will check if the string is a valid username or email.
 * It should be called after verifying with IsValidUsernameOrEmail.
 * @description Check if the string is a valid username or email
 * @param usernameOrEmail
 * @returns UsernameOrEmailType
 */
export const IsUsernameOrEmail = (
  usernameOrEmail: string,
): UsernameOrEmailType => {
  if (EmailReg.test(usernameOrEmail)) return UsernameOrEmailType.Email;

  return UsernameOrEmailType.Username;
};
