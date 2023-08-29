/**
 * Person is the basic person object
 * @property id - the person's id
 * @property full_name - the person's full name
 * @property preferred_name - the person's preferred name
 * @property language_preference - the person's language preference
 */
interface Person {
  id: number;
  full_name: string;
  preferred_name: string;
  language_preference: string;
}

type PersonCreate = Omit<Person, "id">;
