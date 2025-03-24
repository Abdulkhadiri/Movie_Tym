import { useState } from 'react';
import './Review.css';

function Review() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="review-container">
      <div className="review-box">
        <button className="review-close-btn" onClick={handleClose}>×</button>
        <h2 className="review-title">Rate Your Experience</h2>
        <div className="review-stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                className={`review-star ${starValue <= (hover || rating) ? 'active' : ''}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(rating)}
              >
                ★
              </button>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="review-comment-box"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="review-submit-btn">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Review;
