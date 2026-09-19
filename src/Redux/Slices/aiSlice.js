import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";

/* ============================================
   Analyze Drug
============================================ */

export const analyzeDrug = createAsyncThunk(
  "ai/analyzeDrug",
  async (drugId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/api/ai/analyze/${drugId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to analyze drug.",
        }
      );
    }
  }
);

/* ============================================
   Latest Report
============================================ */

export const getLatestReport = createAsyncThunk(
  "ai/getLatestReport",
  async (drugId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/ai/report/${drugId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch report.",
        }
      );
    }
  }
);

/* ============================================
   Analysis History
============================================ */

export const getAnalysisHistory = createAsyncThunk(
  "ai/getAnalysisHistory",
  async (drugId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/ai/history/${drugId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch history.",
        }
      );
    }
  }
);

/* ============================================
   Initial State
============================================ */

const initialState = {
  loading: false,

  error: null,

  latestAnalysis: null,

  history: [],

  analysisHistory: [],

  report: null,
};

/* ============================================
   Slice
============================================ */

const aiSlice = createSlice({
  name: "ai",

  initialState,

  reducers: {
    clearAIState: (state) => {
      state.loading = false;
      state.error = null;
      state.latestAnalysis = null;
      state.history = [];
      state.analysisHistory = [];
      state.report = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ==========================
         Analyze Drug
      ========================== */

      .addCase(analyzeDrug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(analyzeDrug.fulfilled, (state, action) => {
        state.loading = false;

        state.latestAnalysis =
          action.payload.data.latestAnalysis;

        state.history =
          action.payload.data.history;
      })

      .addCase(analyzeDrug.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Analysis failed.";
      })

      /* ==========================
         Latest Report
      ========================== */

      .addCase(getLatestReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLatestReport.fulfilled, (state, action) => {
        state.loading = false;

        state.report =
          action.payload.data;
      })

      .addCase(getLatestReport.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Unable to fetch report.";
      })

      /* ==========================
         History
      ========================== */

      .addCase(getAnalysisHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAnalysisHistory.fulfilled, (state, action) => {
        state.loading = false;

        state.analysisHistory =
          action.payload.data;
      })

      .addCase(getAnalysisHistory.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Unable to fetch history.";
      });
  },
});

export const {
  clearAIState,
} = aiSlice.actions;

export default aiSlice.reducer;
