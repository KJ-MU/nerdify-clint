// features/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for asynchronous actions
const API_ = "https://nerdify-1.onrender.com/review";

// Fetch reviews by course
export const fetchReviewsByCourse = createAsyncThunk(
  "reviews/fetchByCourse",
  async (courseId) => {
    const response = await axios.get(`${API_}/course/${courseId}`);
    return response.data;
  }
);

// Create a new review
export const createReview = createAsyncThunk(
  "reviews/create",
  async (formData, { getState }) => {
    console.log(" finally at the fucking review creation reducer");
    const { user } = getState();
    const response = await axios.post(`${API_}/`, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
      "Content-Type": "multipart/form-data",
    });

    return response.data;
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId, { getState }) => {
    const { user } = getState();
    await axios.delete(`${API_}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return reviewId;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
