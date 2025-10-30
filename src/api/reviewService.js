import axiosInstance from "./axios.js";

const reviewService = {
    addReview: async (reviewData) => {
        const response = await axiosInstance.post("/books/:bookId/reviews",reviewData);
        return response.data;
    },
    getReviews: async () => {
        const response = await axiosInstance.get("/books/:bookId/reviews");
        return response.data;
    },
    deleteReview: async () => {
        const response = await axiosInstance.delete("/books/:bookId/reviews/:id");
        return response.data;
    },
}


export default reviewService;