import axios from "axios";

const API_KEY = "68a3964e6378136ca178ee0f02f1fd6e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const fetchWeather = async (lat: number, lon: number) => {
  const response = await axios.get(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
