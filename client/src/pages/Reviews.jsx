import { useEffect, useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  const reviewerId = localStorage.getItem("userId");

  // For now, review the logged-in user
  const reviewedUserId = localStorage.getItem("userId");

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://skillmate-lixb.onrender.com/api/reviews/${reviewedUserId}`
      );

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.log("Could not load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://skillmate-lixb.onrender.com/api/reviews/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewerId,
            reviewedUserId,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (response.ok) {
        setComment("");
        setRating(5);
        fetchReviews();
      }
    } catch (error) {
      setMessage("Could not add review");
    }
  };

  return (
    <div className="skills-page">
      <div className="skills-container">

        <h1>Reviews & Ratings ⭐</h1>

        <p className="skills-subtitle">
          Share your learning experience.
        </p>
        <div className="rating-summary">

  <h2>⭐ Average Rating</h2>

  <div className="rating-number">
    {averageRating}/5
  </div>

  <p>
    ⭐⭐⭐⭐⭐
  </p>

  <small>
    Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
  </small>

</div>

        <div className="add-skill-card">

          <h2>Write a Review</h2>

          <form onSubmit={handleReview}>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="2">⭐⭐ 2</option>
              <option value="1">⭐ 1</option>
            </select>

            <input
              type="text"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button type="submit" className="auth-btn">
              Submit Review
            </button>

          </form>

          {message && <p className="message">{message}</p>}

        </div>

        <div className="skills-list">

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div className="skill-card" key={review._id}>

                <h3>
                  ⭐ {review.rating}/5
                </h3>

                <p>{review.comment}</p>

                <small>
                  Reviewed by: {review.reviewerId?.name || "Student"}
                </small>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Reviews;