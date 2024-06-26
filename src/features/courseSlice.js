import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  courses: [],
  // createCourse: { isLoading: false, isSucess: false },
  course: null,
  mostSubscribedCourses: [],
  loading: false,
  error: null,
};

// Helper function to get the token
const getToken = () => localStorage.getItem("token");
const API_ = "https://nerdify-1.onrender.com/course";

// Async Thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get(`${API_}/`);
    return response.data;
  }
);
export const fetchCoursesByLevel = createAsyncThunk(
  "courses/fetchCoursesByLevel",
  async (level) => {
    const response = await axios.get(`${API_}/level/${level}`);
    return response.data;
  }
);
// Fetch top ten most subscribed courses
export const fetchMostSubscribedCourses = createAsyncThunk(
  "courses/fetchMostSubscribedCourses",
  async () => {
    const response = await axios.get(`${API_}/most-subscribed`);
    return response.data;
  }
);
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id) => {
    const response = await axios.get(`${API_}/${id}`);
    return response.data;
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (formData) => {
    const token = getToken();
    const response = await axios.post(`${API_}/`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }) => {
    const token = getToken();
    const response = await axios.put(`${API_}/${id}`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    const token = getToken();
    await axios.delete(`${API_}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

export const subscribeToCourse = createAsyncThunk(
  "courses/subscribeToCourse",
  async ({ courseId }) => {
    const token = getToken();
    const response = await axios.post(
      `https://nerdify-1.onrender.com/user/subscribe/${courseId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);
export const searchCoursesByTitle = createAsyncThunk(
  "courses/searchCoursesByTitle",
  async (inputValue) => {
    try {
      const response = await axios.get(`${API_}/search/${inputValue}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// Create the slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCoursesByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create course
      .addCase(createCourse.pending, (state) => {
        // // state.createCourse.isLoading = true;
        // state.createCourse.isSucess = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        // state.createCourse.isLoading = false;
        // state.createCourse.isSucess = true;
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        // state.createCourse.isLoading = false;
        // state.createCourse.isSucess = false;
        state.loading = false;
        state.error = action.error.message;
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Subscribe to course
      .addCase(subscribeToCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToCourse.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the subscription success if needed
      })
      .addCase(subscribeToCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch top ten most subscribed courses
      .addCase(fetchMostSubscribedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostSubscribedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.mostSubscribedCourses = action.payload;
      })
      .addCase(fetchMostSubscribedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchCoursesByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCoursesByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(searchCoursesByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
