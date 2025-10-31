// Helper function to calculate rating statistics
const calculateRatingStats = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      percentages: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      totalReviews: 0,
      averageRating: 0,
    };
  }

  // Count each rating
  const counts = reviews.reduce((acc, review) => {
    const rating = review.rating || review.review; // Handle both field names
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const totalReviews = reviews.length;

  // Calculate percentages
  const percentages = {
    1: (counts[1] / totalReviews) * 100,
    2: (counts[2] / totalReviews) * 100,
    3: (counts[3] / totalReviews) * 100,
    4: (counts[4] / totalReviews) * 100,
    5: (counts[5] / totalReviews) * 100,
  };

  // Calculate average rating
  const totalRating = Object.entries(counts).reduce(
    (sum, [rating, count]) => sum + rating * count,
    0
  );
  const averageRating = totalRating / totalReviews;

  return {
    counts,
    percentages,
    totalReviews,
    averageRating,
  };
};

export default calculateRatingStats;