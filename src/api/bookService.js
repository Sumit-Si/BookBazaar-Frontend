import axiosInstance from "./axios.js";

const bookService = {
  createBook: async (bookData) => {
    const response = await axiosInstance.post("/books", bookData);
    return response.data;
  },
  getBooks: async () => {
    const response = await axiosInstance.get("/books");
    return response.data;
  },
  getBookById: async (bookId) => {
    const response = await axiosInstance.get(`/books/${bookId}`);
    return response.data;
  },
  updateBook: async (bookId, bookData) => {
    const response = await axiosInstance.put(`/books/${bookId}`, bookData);
    return response.data;
  },
  deleteBook: async (bookId) => {
    const response = await axiosInstance.delete(`/books/${bookId}`);
    return response.data;
  },
};

export default bookService;
