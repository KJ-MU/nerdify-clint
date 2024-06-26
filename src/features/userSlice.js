import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const API_ = "https://nerdify-1.onrender.com/user";

// Thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_}/login`, { email, password });
      const { user, token } = response.data;
      localStorage.setItem("token", token); // Save token to localStorage
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.post(`${API_}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { user, token } = response.data;
      localStorage.setItem("token", token); // Save token to localStorage
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      if (!token) {
        throw new Error("No token available");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_}/profile`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ values, token }, { rejectWithValue }) => {
    try {
      // console.log(values);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(`${API_}/update`, values, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for subscribing to a course
export const subscribeToCourse = createAsyncThunk(
  "user/subscribeToCourse",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      if (!token) {
        throw new Error("No token available");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_}/subscribe/${courseId}`,
        null,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(subscribeToCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToCourse.fulfilled, (state, action) => {
        state.loading = false;
        // Update user data in state after successful subscription
        state.user = action.payload;
        state.error = null;
      })
      .addCase(subscribeToCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
