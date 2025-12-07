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

    // TODO: send to backend
    // fetch("/api/reviews", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newReview),
    // });
  };

  return (
    <div className="py-16 bg-base-200">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        What People Say About RedPulseBD
      </h1>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-16">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-base-100 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="text-xl font-semibold text-neutral">
                  {review.name}
                </h3>

                {/* Ratings */}
                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral">{review.description}</p>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center mt-10 mb-5">
        <button className="btn btn-primary text-black" onClick={openModal}>
          Write a Review
        </button>
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
