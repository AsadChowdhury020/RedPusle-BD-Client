// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import useAuth from "../../hooks/useAuth";
// import { useState } from "react";

// const ReviewModal = ({ isOpen, closeModal, submitReview }) => {
//   const { user } = useAuth();
//   const [rating, setRating] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = () => {
//     const review = {
//       name: user?.displayName,
//       image: user?.photoURL,
//       rating: parseInt(rating),
//       description,
//     };

//     submitReview(review); // send to parent
//     closeModal(); // close modal
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       as="div"
//       className="relative z-50 focus:outline-none"
//       onClose={closeModal}
//     >
//       <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <DialogPanel
//           transition
//           className="w-full max-w-md bg-base-100 p-6 rounded-2xl shadow-xl duration-300 ease-out 
//           data-[closed]:scale-95 data-[closed]:opacity-0"
//         >
//           <DialogTitle className="text-xl font-semibold text-primary text-center mb-4">
//             Write a Review
//           </DialogTitle>

//           {/* NAME */}
//           <div className="mb-3">
//             <label className="font-semibold">Your Name</label>
//             <input
//               type="text"
//               readOnly
//               value={user?.displayName}
//               className="input input-bordered w-full bg-base-200"
//             />
//           </div>

//           {/* IMAGE */}
//           <div className="mb-3">
//             <label className="font-semibold">Your Image</label>
//             <input
//               type="text"
//               readOnly
//               value={user?.photoURL}
//               className="input input-bordered w-full bg-base-200"
//             />
//           </div>

//           {/* RATING */}
//           <div className="mb-3">
//             <label className="font-semibold">Rating (1–5)</label>
//             <select
//               className="select select-bordered w-full"
//               required
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             >
//               <option value="">Select a rating</option>
//               <option value="1">★ 1</option>
//               <option value="2">★ 2</option>
//               <option value="3">★ 3</option>
//               <option value="4">★ 4</option>
//               <option value="5">★ 5</option>
//             </select>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="mb-3">
//             <label className="font-semibold">Your Review</label>
//             <textarea
//               className="textarea textarea-bordered w-full"
//               placeholder="Write your experience..."
//               required
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               className="btn bg-red-200 text-red-900 hover:bg-red-300"
//               onClick={closeModal}
//             >
//               Cancel
//             </button>

//             <button
//               className="btn btn-primary text-black"
//               onClick={handleSubmit}
//             >
//               Submit Review
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// };

// export default ReviewModal;
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const ReviewModal = ({ isOpen, closeModal, submitReview }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const review = {
      name: user?.displayName,
      image: user?.photoURL,
      rating: parseInt(rating),
      description,
    };

    submitReview(review); // send to Reviews.jsx
    closeModal(); // close modal
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md bg-base-100 p-6 rounded-2xl shadow-xl duration-300 ease-out 
            data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="text-xl font-semibold text-primary text-center mb-4">
            Write a Review
          </DialogTitle>

          {/* NAME */}
          <div className="mb-3">
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
              readOnly
              value={user?.displayName}
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* IMAGE */}
          <div className="mb-3">
            <label className="font-semibold">Your Image</label>
            <input
              type="text"
              readOnly
              value={user?.photoURL}
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* RATING */}
          <div className="mb-3">
            <label className="font-semibold">Rating (1–5)</label>
            <select
              className="select select-bordered w-full"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select a rating</option>
              <option value="1">★ 1</option>
              <option value="2">★ 2</option>
              <option value="3">★ 3</option>
              <option value="4">★ 4</option>
              <option value="5">★ 5</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="font-semibold">Your Review</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your experience..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="btn bg-red-200 text-red-900 hover:bg-red-300"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary text-black"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
