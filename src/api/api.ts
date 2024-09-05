import {WeatherData} from '../types/WeatherData';
import {GeocodingData} from '../types/GeocodingData';
import {API_BASE_URLS} from '../constants';
import objectToQueryString from '../helpers/objectToQueryString';

const {GEOCODING, WEATHER} = API_BASE_URLS;

export const fetchWeatherData = async (
  latitude: number,
  longitude: number,
): Promise<WeatherData> => {
  const queryParams = {
    latitude,
    longitude,
    current: 'temperature_2m,is_day,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  };
  const queryString = objectToQueryString(queryParams);
  const url = `${WEATHER}?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchGeocodingData = async (
  cityName: string,
): Promise<GeocodingData> => {
  const queryParams = {
    name: cityName,
    count: 10,
    language: 'en',
    format: 'json',
  };

  const queryString = objectToQueryString(queryParams);
  const url = `${GEOCODING}?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GeocodingData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    throw error;
  }
};
