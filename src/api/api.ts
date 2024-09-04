import { WeatherData } from "../types/WeatherData";
import { GeocodingData } from "../types/GeocodingData";
import { API_BASE_URLS } from "../constants";

const { GEOCODING, WEATHER} = API_BASE_URLS

export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const url = `${WEATHER}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m,weather_code`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchGeocodingData = async (
  cityName: string
): Promise<GeocodingData> => {
  const url = `${GEOCODING}?name=${cityName}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GeocodingData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
};
