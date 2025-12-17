import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import ReviewModal from "../../components/Modal/ReviewModal";

const Reviews = () => {
  const reviews = useLoaderData();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submitReview = (newReview) => {
    console.log("New Review Submitted:", newReview);
  };

  return (
    <div className="pt-16 bg-base-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 lg:px-16 mb-10 gap-4">
        <h1 className="text-4xl font-bold text-primary">
          What People Say About RedPulseBD
        </h1>

        <button className="btn btn-primary" onClick={openModal}>
          Write a Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-16">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-base-100 border border-base-300 shadow-sm p-6 rounded-xl hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />

              <div>
                <h3 className="text-xl font-semibold text-base-content">
                  {review.name}
                </h3>

                {/* Ratings */}
                <div className="flex text-warning mt-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-base-content/70">
              {review.description}
            </p>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        submitReview={submitReview}
      />
    </div>
  );
};

export default Reviews;
