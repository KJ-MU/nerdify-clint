// features/lessonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_ = "https://nerdify-1.onrender.com/lesson";

// Thunks for asynchronous actions
export const fetchLessonById = createAsyncThunk(
  "lesson/fetch",
  async (lessonId) => {
    const response = await axios.get(`${API_}/${lessonId}`);
    return response.data;
  }
);

export const fetchLessonsByChapter = createAsyncThunk(
  "lessons/fetchByChapter",
  async (chapterId) => {
    const response = await axios.get(`${API_}/chapter/${chapterId}`);
    return response.data;
  }
);

export const createLesson = createAsyncThunk(
  "lessons/create",
  async ({ chapterId, lessonData }, { getState }) => {
    const { user } = getState();
    const formData = new FormData();
    for (const key in lessonData) {
      formData.append(key, lessonData[key]);
    }
    const response = await axios.post(`${API_}/${chapterId}`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateLesson = createAsyncThunk(
  "lessons/update",
  async ({ lessonId, lessonData }, { getState }) => {
    const { user } = getState();
    const formData = new FormData();
    for (const key in lessonData) {
      formData.append(key, lessonData[key]);
    }
    const response = await axios.put(`${API_}/${lessonId}`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/delete",
  async (lessonId, { getState }) => {
    const { user } = getState();
    await axios.delete(`${API_}/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return lessonId;
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    lesson: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLessonsByChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessonsByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(fetchLessonsByChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson.push(action.payload);
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lesson.findIndex(
          (les) => les._id === action.payload._id
        );
        if (index !== -1) {
          state.lesson[index] = action.payload;
        }
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = state.lesson.filter(
          (les) => les?._id !== action.payload
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default lessonSlice.reducer;
