import React, { useState } from "react";
import Review from "./Rrview";
import AddReviewModal from "./AddReviewModal";
const Overview = ({ courseView }) => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);
  return (
    <div className="w-full">
      <div
        className=" flex flex-col text-justify mb-5"
        dangerouslySetInnerHTML={{ __html: courseView }}
      />
      <button
        onClick={openReviewModal}
        className="mb-5 flex bg-[#0D99FF] text-white px-4 py-2 rounded-md"
      >
        Leave a Review
      </button>
      <Review />

      <AddReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} />
    </div>
  );
};

export default Overview;
