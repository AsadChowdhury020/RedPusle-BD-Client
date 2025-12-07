// import React from 'react';

// const Reviews = () => {
//     return (
//         <div>
//             <h1>Reviews</h1>
//         </div>
//     );
// };

// export default Reviews;

import React from "react";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router";

const Reviews = () => {
    const reviews = useLoaderData()
    console.log(reviews)
  return (
    <div className="py-16 bg-base-200">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        What People Say About RedPulseBD
      </h1>

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
      {/* <button></button> */}
    </div>
  );
};

export default Reviews;
