// features/chapterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_ = "https://nerdify-1.onrender.com/chapter";
const getToken = () => localStorage.getItem("token");
// Thunks for asynchronous actions
export const fetchAllChapters = createAsyncThunk(
  "chapters/fetchAll",
  async () => {
    const response = await axios.get(`${API_}/`);
    return response.data;
  }
);

export const fetchChaptersByCourse = createAsyncThunk(
  "chapters/fetchByCourse",
  async (courseId) => {
    const response = await axios.get(`${API_}/course/${courseId}`);
    return response.data;
  }
);

export const createChapter = createAsyncThunk(
  "chapters/create",
  async (formData) => {
    const token = getToken();

    const response = await axios.post(
      "https://nerdify-1.onrender.com/chapter/",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      }
    );
    return response.data;
  }
);

export const updateChapter = createAsyncThunk(
  "chapters/update",
  async ({ chapterId, chapterData }, { getState }) => {
    const { user } = getState();
    const response = await axios.put(`${API_}/${chapterId}`, chapterData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  }
);

export const deleteChapter = createAsyncThunk(
  "chapters/delete",
  async (chapterId, { getState }) => {
    const { user } = getState();
    await axios.delete(`${API_}/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return chapterId;
  }
);

const chapterSlice = createSlice({
  name: "chapters",
  initialState: {
    chapters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchAllChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChaptersByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChaptersByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChaptersByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters.push(action.payload);
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChapter.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.chapters.findIndex(
          (chapter) => chapter._id === action.payload._id
        );
        if (index !== -1) {
          state.chapters[index] = action.payload;
        }
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = state.chapters.filter(
          (chapter) => chapter._id !== action.payload
        );
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chapterSlice.reducer;
