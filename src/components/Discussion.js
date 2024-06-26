import "./styles/Modal.css";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  createDiscussion,
  fetchDiscussionsByCourse,
  addComment,
} from "../features/discussionSlice";

const Discussions = () => {
  const { discussions, loading, error } = useSelector(
    (state) => state.discussion
  );
  const { course } = useSelector((state) => state.course);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeDiscussions, setActiveDiscussions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const courseId = course?._id;
  const itemsPerPage = 4;
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchDiscussionsByCourse(courseId));
    }
  }, [dispatch, courseId]);

  const handleAddDiscussion = () => {
    const formData = new FormData();
    formData.append("title", newDiscussion.title);
    formData.append("text", newDiscussion.content);
    formData.append("course", courseId);

    dispatch(createDiscussion(formData));

    setNewDiscussion({ title: "", content: "" });
    setModalIsOpen(false);
  };

  const handleAddComment = (discussionId) => {
    dispatch(addComment({ discussionId, text: newComment }));
    setNewComment("");
  };

  const toggleDiscussion = (id) => {
    setActiveDiscussions((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const offset = currentPage * itemsPerPage;
  const currentDiscussions = discussions.slice(offset, offset + itemsPerPage);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container  text-left mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <button
          className="px-4 py-2 bg-[#0D99FF] text-white rounded"
          onClick={() => setModalIsOpen(true)}
        >
          Add Discussion
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Discussion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-2">Start a new discussion</h2>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Title"
          value={newDiscussion.title}
          onChange={(e) =>
            setNewDiscussion({ ...newDiscussion, title: e.target.value })
          }
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Content"
          value={newDiscussion.content}
          onChange={(e) =>
            setNewDiscussion({ ...newDiscussion, content: e.target.value })
          }
        />
        <button
          className="px-4 py-2 bg-[#0D99FF] text-white rounded"
          onClick={handleAddDiscussion}
        >
          Add Discussion
        </button>
      </Modal>

      <div>
        {currentDiscussions.map((discussion) => (
          <div
            key={discussion._id}
            className="mb-6 p-4 bg-white rounded shadow"
          >
            <div className="flex items-center mb-4">
              <img
                src={discussion.user.profileImage}
                alt={discussion.user.fullName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="text-sm text-gray-600">
                  {discussion.user.fullName}
                </p>
                <p className="text-lg font-semibold">{discussion.title}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(discussion.date)}
                </p>
              </div>
            </div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDiscussion(discussion._id)}
            >
              {activeDiscussions.includes(discussion._id) ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>

            {activeDiscussions.includes(discussion._id) && (
              <>
                <p className="mb-4">{discussion.text}</p>
                <div className="ml-4 mb-4">
                  {discussion.comments.map((comment) => (
                    <div key={comment._id} className="mb-2">
                      <div className="flex items-center mb-2">
                        <img
                          src={comment.user.profileImage}
                          alt={comment.user.fullName}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {comment.user.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(comment.date)}
                          </p>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-100 rounded">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <input
                    type="text"
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-[#0D99FF] text-white rounded"
                    onClick={() => handleAddComment(discussion._id)}
                  >
                    Add Comment
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {discussions.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(discussions.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          nextLinkClassName={"nex"}
          previousLinkClassName={"prev"}
          disabledClassName={"disabled"}
          pageClassName={"page"}
        />
      )}
    </div>
  );
};

export default Discussions;
