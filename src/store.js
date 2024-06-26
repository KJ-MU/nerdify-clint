import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import courseReducer from "./features/courseSlice";
import chapterReducer from "./features/chapterSlice";
import lessonReducer from "./features/lessonSlice";
import reviewReducer from "./features/reviewSlice";
import noteReducer from "./features/noteSlice";
import discussionReducer from "./features/discussionSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    chapter: chapterReducer,
    lesson: lessonReducer,
    review: reviewReducer,
    note: noteReducer,
    discussion: discussionReducer,
  },
});

export default store;
