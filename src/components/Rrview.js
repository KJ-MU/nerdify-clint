import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { deleteReview } from "../features/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByCourse } from "../features/reviewSlice";
import LoadingSpinner from "./LoadingSpinner";
const Review = () => {
  const { reviews } = useSelector((state) => state.review);
  const { course, loading, error } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.user);
  let [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const courseId = course?._id;

  if (loading.isFulfilled) {
    dispatch(fetchReviewsByCourse(courseId));
  }

  const handelReviewDelete = (reviewId) => {
    alert(
      "Your review on this course will be deleted ,Are you sure you want to delete ?"
    );
    dispatch(deleteReview(reviewId));
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.userId);
    }
    dispatch(fetchReviewsByCourse(courseId));
  }, [dispatch, course?._id, token]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <article key={review._id} className="border p-4 mb-4">
            <div className="text-left flex items-center mb-4">
              <div className="font-medium">
                <p>{review?.user?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < review?.stars ? "text-yellow-300" : "text-gray-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p className="text-left">
                <time dateTime={new Date(review?.createdAt).toISOString()}>
                  {new Date(review?.createdAt).toLocaleDateString()}
                </time>
              </p>
            </footer>
            <p className="mb-2 text-left text-gray-500">{review?.text}</p>
            {userId && userId === review?.user._id ? (
              <div className="w-full flex justify-end ">
                <svg
                  className="hover:scale-110 transition-all ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#FF0000"
                  onClick={() => handelReviewDelete(review?._id)}
                >
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-.55 0-1 .45-1 1s.45 1 1 1h1v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1zM9 4h6v2H9V4zm7 16H8V8h8v12z" />
                </svg>
              </div>
            ) : null}
          </article>
        ))
      ) : (
        <div className="my-10 w-full flex justify-start">
          <p>No reviews yet</p>
        </div>
      )}
    </div>
  );
};

export default Review;
