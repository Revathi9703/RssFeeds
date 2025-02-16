import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  temperatureUnit: "Celsius" | "Fahrenheit";
  newsFrequency: "Hourly" | "Daily";
}

const initialState: SettingsState = {
  temperatureUnit: "Celsius",
  newsFrequency: "Daily",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<"Celsius" | "Fahrenheit">) => {
      state.temperatureUnit = action.payload;
    },
    setNewsFrequency: (state, action: PayloadAction<"Hourly" | "Daily">) => {
      state.newsFrequency = action.payload;
    },
  },
});

export const { setTemperatureUnit, setNewsFrequency } = settingsSlice.actions;
export default settingsSlice.reducer;
