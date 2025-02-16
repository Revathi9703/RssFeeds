import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import newsReducer from "./slices/newsSlice";
import settingsReducer from "./slices/settingSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
