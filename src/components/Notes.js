import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createNote, fetchNotesByUserAndLesson } from "../features/noteSlice";

const Notes = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const dispatch = useDispatch();
  const { lesson } = useSelector((state) => state.lesson);
  const { user } = useSelector((state) => state.user);
  const { notes, loading } = useSelector((state) => state.note);

  const handleEditorChange = (content) => {
    setEditorHtml(content);
  };

  const handleAddNotes = () => {
    if (user?._id && lesson?._id) {
      dispatch(createNote({ text: editorHtml, lesson: lesson._id }));
      setEditorHtml(""); // Clear the editor after adding a note
    }
  };

  useEffect(() => {
    if (lesson?._id && user?._id) {
      dispatch(
        fetchNotesByUserAndLesson({ lessonId: lesson._id, userId: user._id })
      );
    }
  }, [dispatch, lesson?._id, user?._id]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="text-left max-w-full mx-auto mt-8">
      {Array.isArray(lesson) && lesson.length !== 0 ? (
        <div>Choose a lesson to show your notes</div>
      ) : (
        <>
          <div className="bg-white md:h-80 rounded-lg shadow-md p-4">
            <button
              onClick={handleAddNotes}
              className="px-6 py-2 bg-[#0D99FF] text-white rounded-md mb-4"
            >
              Add note
            </button>
            <ReactQuill
              className="md:h-48"
              theme="snow"
              value={editorHtml}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              placeholder="Write notes"
            />
          </div>
          <div className="bg-white mt-8 rounded-lg shadow-md p-4">
            <h2 className="text-2xl mb-4">Notes</h2>
            {loading ? (
              <p>Loading notes...</p>
            ) : Array.isArray(lesson) &&
              lesson.length === 0 &&
              notes &&
              notes.length > 0 ? (
              notes.map((note) => (
                <div key={note._id} className="border-b border-gray-300 py-2">
                  <div dangerouslySetInnerHTML={{ __html: note.text }} />
                </div>
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notes;
