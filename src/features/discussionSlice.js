// features/discussionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for asynchronous actions
const API_ = "https://nerdify-1.onrender.com/discussion";
// Fetch discussions by course
export const fetchDiscussionsByCourse = createAsyncThunk(
  "discussions/fetchByCourse",
  async (courseId) => {
    const response = await axios.get(`${API_}/course/${courseId}`);
    return response.data;
  }
);

// Create a new discussion
export const createDiscussion = createAsyncThunk(
  "discussions/create",
  async (formData, { getState }) => {
    const { user } = getState();
    const response = await axios.post(`${API_}/`, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  }
);

// Add a comment to a discussion
export const addComment = createAsyncThunk(
  "discussions/addComment",
  async ({ discussionId, text }, { getState }) => {
    const { user } = getState();
    const response = await axios.post(
      `${API_}/${discussionId}/comment`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  }
);

const discussionSlice = createSlice({
  name: "discussions",
  initialState: {
    discussions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussionsByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscussionsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussionsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDiscussion.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.loading = false;
        state.discussions.push(action.payload);
      })
      .addCase(createDiscussion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const discussionIndex = state.discussions.findIndex(
          (discussion) => discussion._id === action.payload._id
        );
        if (discussionIndex !== -1) {
          state.discussions[discussionIndex] = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default discussionSlice.reducer;
