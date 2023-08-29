/**
 * User is the basic user object
 * @property id - the user's id
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 */
interface User {
  id: number;
  username: string;
  email?: string;
  password: string;
}

/**
 * UserCreate is the object used to create a new user
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 * @property person_attributes - the user's person object
 */
interface UserCreate extends Omit<User, "id"> {
  person_attributes: PersonCreate;
}

/**
 * UserCreateForm is the object used to create a new user
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 * @property passwordConfirm - the user's password confirmation
 * @property person_attributes - the user's person object
 */
interface UserCreateForm extends UserCreate {
  passwordConfirmation: string;
}

/**
 * UserLogin is the object used to login a user
 * Either username or email must be provided
 */
type UserLogin =
  | (Omit<User, "id" | "username"> & { email: string })
  | (Omit<User, "id" | "email"> & { username: string });

/**
 * UserUpdate is the object used to update a user
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 */
type UserUpdate = Partial<UserCreate>;

/**
 * UserPerson is a combination of User and Person
 * @property id - the user's id
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 * @property person_attributes - the user's person object
 */
interface UserPerson extends User {
  person_attributes: Person;
}

type UserPayload = Omit<UserPerson, "password">;

interface LoginPayload extends UserPerson {
  abilities: string[];
}
