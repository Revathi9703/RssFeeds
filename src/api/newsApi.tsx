import axios from "axios";

const API_KEY = "7b96befd4053473e8ac3f802a2633704";
const BASE_URL = "https://newsapi.org/v2/";

export const fetchNews = async (category: string) => {
  const response = await axios.get(
    `${BASE_URL}top-headlines?category=${category}&apiKey=${API_KEY}`
  );
  return response.data.articles;
};
