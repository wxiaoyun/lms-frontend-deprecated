import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Constants from "../../config/constants";

const initialState: BookState = {
  books: [],
  search: undefined,
  searchResults: [],
  page: 1,
  total: 0,
  step: Constants.DEFAULT_COLLECTION_QUERY_LIMIT,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    /**
     * Set the book list
     * @param action PayloadAction<Book[]> - The list of books
     */
    setBookList: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    /**
     * Update an existing book
     * @param action PayloadAction<Book> - The book to update
     */
    updateExistingBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id,
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    /**
     * Delete a book
     * @param action PayloadAction<number> - The book ID to delete
     */
    deleteBook: (state, action: PayloadAction<number>) => {
      const index = state.books.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        state.books.splice(index, 1);
      }
    },
    /**
     * Add a new book
     * @param action PayloadAction<Book> - The book to add
     */
    addNewBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    /**
     * Update the page settings
     * @param action PayloadAction - The page settings to update
     */
    updatePageSetting(
      state,
      action: PayloadAction<{
        search?: string;
        page?: number;
        total?: number;
        step?: number;
      }>,
    ) {
      if (action.payload.search) {
        state.search = action.payload.search;
      }
      if (action.payload.page) {
        state.page = Math.max(action.payload.page, 0);
      }
      if (action.payload.total) {
        state.total = Math.max(action.payload.total, 0);
      }
      if (action.payload.step) {
        state.step = Math.max(
          action.payload.step,
          Constants.MINIMUM_PAGE_LIMIT,
        );
      }
    },
    updateSearchResults: (state, action: PayloadAction<BookSearch[]>) => {
      state.searchResults = action.payload;
    },
  },
});
