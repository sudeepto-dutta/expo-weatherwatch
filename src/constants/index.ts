export const API_BASE_URLS = {
  WEATHER: "https://api.open-meteo.com/v1/forecast",
  GEOCODING: "https://geocoding-api.open-meteo.com/v1/search",
};

export const DEFAULT_COORDINATES = {
  LATITUDE: 51.50853, // Default latitude (e.g., London)
  LONGITUDE: -0.12574, // Default longitude (e.g., London)
};

export const DEFAULT_CITY = "London";

export const QUERY_PARAMS = {
  COUNT: 10,
  LANGUAGE: "en",
  FORMAT: "json",
};
