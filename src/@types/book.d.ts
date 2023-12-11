/**
 * Book interface is the basic book object
 * @property id - the book's id
 * @property title - the book's title
 * @property author - the book's author
 * @property isbn - the book's isbn
 * @property publisher - the book's publisher
 * @property publication_date - the book's publication date
 * @property genre - the book's genre
 * @property language - the book's language
 */
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_date: string;
  genre: string;
  language: string;
}

/**
 * BookCreate is the object used to create a new book
 */
type BookCreate = Omit<Book, "id">;

/**
 * BookUpdate is the object used to update a book
 */
type BookUpdate = Partial<BookCreate>;

/**
 * BookState is the state of the book reducer
 */
interface BookState {
  books: Book[];
  search: string | undefined;
  searchResults: BookSearch[];
  page: number;
  total: number;
  step: number;
}

type BookSearch = Pick<Book, "id" | "title">;
