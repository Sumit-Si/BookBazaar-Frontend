import { create } from "zustand";
import reviewService from "../api/reviewService.js";
import toast from "react-hot-toast";

const useReviewStore = create((set) => ({
    reviews: [],
    review: {},
    isReviewLoading: false,
    isReviewCreating: false,
    isReviewDeleting: false,

    addReview: async (bookId,reviewData) => {
        try {
            set({ isReviewCreating: true });
            const res = await reviewService.addReview(bookId,reviewData);
            console.log("Review create res", res);
            set((state) => ({
                reviews: [...state.reviews,res.review],
            }));
            toast.success(res?.message);
        } catch (error) {
            console.log("Error while creating review: ",error);
            toast.error(error?.response?.data?.error || error?.response?.data?.message);
        } finally {
            set({ isReviewCreating: false });
        }
    },

    getReviews: async (bookId) => {
        try {
            set({isReviewLoading: true});
            const res = await reviewService.getReviews(bookId);
            console.log("Review res", res);
            set({reviews: res?.reviews || []});
            toast.success(res?.message);
            return res;
        } catch (error) {
            console.log("Error while fetching reviews: ",error);
            toast.error(error?.response?.data?.error || error?.response?.data?.message);
        } finally {
            set({isReviewLoading: false});
        }
    },

    deleteReview: async (reviewId) => {
        try {
            set({isReviewDeleting: true});
            const res = await reviewService.deleteReview(reviewId);
            console.log("delete review res: ",res);
            
        } catch (error) {
            console.log("Error while deleting review: ",error);
            
        } finally {
            set({isReviewDeleting: false});
        }
    }
}));


export default useReviewStore;