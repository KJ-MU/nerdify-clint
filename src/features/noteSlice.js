// features/noteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for asynchronous actions
const API_ = "https://nerdify-1.onrender.com/note";

// Fetch notes by user and lesson
export const fetchNotesByUserAndLesson = createAsyncThunk(
  "notes/fetchByUserAndLesson",
  async (lessonId, { getState }) => {
    const { user } = getState();
    const response = await axios.get(`${API_}/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  }
);

// Create a new note
export const createNote = createAsyncThunk(
  "notes/create",
  async ({ text, lessonId }, { getState }) => {
    const { user } = getState();
    const response = await axios.post(
      `${API_}`,
      { text, lesson: lessonId },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ noteId, text }, { getState }) => {
    const { user } = getState();
    const response = await axios.put(
      `${API_}/${noteId}`,
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

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesByUserAndLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotesByUserAndLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotesByUserAndLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default noteSlice.reducer;
