import { create } from "zustand";
import bookService from "../api/bookService.js";
import toast from "react-hot-toast";

const useBookStore = create((set) => ({
  books: [],
  book: {},
  isBookLoading: false,
  isBookCreating: false,
  isBookUpdating: false,
  isBookDeleting: false,

  createBook: async (bookData) => {
    set({ isBookCreating: true });

    try {
      const res = await bookService.createBook(bookData);
      console.log("Book create res", res);

      // set({books: [...books,res]});
      toast.success("Book created successfully");
    } catch (error) {
      console.log("Error while creating book", error);
      toast.error(error?.data);
    } finally {
      set({ isBookCreating: false });
    }
  },
  getBooks: async () => {
    set({ isBookLoading: true });

    try {
      const res = await bookService.getBooks();
      console.log("books res", res?.books);
      set({ books: res?.books || [] });
    } catch (error) {
      console.log("Error while fetching books", error);
    //   const errorMessage =
    //     error?.response?.data?.message ||
    //     error?.message ||
    //     "Failed to fetch books";
    //   set({ error: errorMessage });
    //   toast.error(errorMessage);
    } finally {
      set({ isBookLoading: false });
    }
  },

  getBookById: async (bookId) => {
    set({ isBookLoading: true });

    try {
        const res = await bookService.getBookById(bookId);
        console.log("book res", res);
        set({book: res?.book || {}});
    } catch (error) {
        console.log("Error while fetching book by id",error);
        
    }
  },

  updateBook: async (bookId, bookData) => {
    set({ isBookUpdating: true });

    try {
      const res = await bookService.updateBook(bookId, bookData);
      console.log("books update res", res);
    } catch (error) {
      console.log("Error while updating book", error);
    } finally {
      set({ isBookUpdating: false });
    }
  },
  deleteBook: async (bookId) => {
    set({ isBookDeleting: true });

    try {
      const res = await bookService.deleteBook(bookId);
      console.log("books delete res", res);
    } catch (error) {
      console.log("Error while deleting book", error);
    } finally {
      set({ isBookDeleting: false });
    }
  },
}));

export default useBookStore;
