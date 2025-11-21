import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMap = createAsyncThunk(
  "fetch-map",
  async (apiUrl: string) => {
    const response = await fetch(apiUrl);

    return response.json();
  }
);

interface MapProps {
  data: Array<any>;
  status: string;
}

const initialState: MapProps = {
  data: [],
  status: "",
};

const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMap.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(fetchMap.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMap.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default MapSlice;
