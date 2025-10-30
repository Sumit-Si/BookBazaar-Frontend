import { create } from "zustand";
import reviewService from "../api/reviewService.js";

const useReviewStore = create((set) => ({
    reviews: [],
    review: {},
    isReviewLoading: false,
    isReviewCreating: false,
    isReviewDeleting: false,

    addReview: async (reviewData) => {
        try {
            set({ isReviewCreating: true });
            const res = await reviewService.addReview(reviewData);
            console.log("Review create res", res);
            // set({reviews: [...reviews,res]});
        } catch (error) {
            console.log("Error while creating review: ",error);
            
        } finally {
            set({ isReviewCreating: false });
        }
    },

    getReviews: async () => {
        try {
            set({isReviewLoading: true});
            const res = await reviewService.getReviews();
            console.log("Review res", res);
        } catch (error) {
            console.log("Error while fetching reviews: ",error);
            
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