import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../api/weatherApi";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    try {
      console.log(`Fetching Weather for Lat: ${lat}, Lon: ${lon}`);
      const response = await fetchWeather(lat, lon);
      console.log("Weather API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default weatherSlice.reducer;
