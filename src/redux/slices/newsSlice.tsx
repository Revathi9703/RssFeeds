import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "../../api/newsApi";

export const getNews = createAsyncThunk(
  "news/getNews",
  async (category: string) => {
    return await fetchNews(category);
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: { articles: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = "succeeded";
      })
      .addCase(getNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default newsSlice.reducer;
