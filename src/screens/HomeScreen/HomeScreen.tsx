import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchWeatherData } from "../../api/api";
import { WeatherData } from "../../types/WeatherData";
import { DEFAULT_LAT_LONG, DEFAULT_CITY } from "../../constants";
import getWeatherImage, { WeatherCode } from "../../helpers/getWeatherImage";
import WeatherDisplay from "../../components/WeatherDisplay";
import SearchBar from "../SearchBar/SearchBar";
import getWeatherDataFromCode from "../../helpers/getWeatherImage";

const HomeScreen: React.FC = () => {
  const { latitude, longitude } = DEFAULT_LAT_LONG;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  }>({ latitude, longitude, name: DEFAULT_CITY });

  useEffect(() => {
    console.log({ locationData });
    getWeather(
      locationData?.latitude ?? latitude,
      locationData?.longitude ?? longitude
    );
  }, [locationData.latitude, locationData.longitude]);

  useEffect(() => {}, []);

  const getWeather = async (latitude: number, longitude: number) => {
    try {
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data", err);
    }
  };

  const handleLocationSelect = (selectedLocation: {
    latitude: number;
    longitude: number;
    name: string;
  }) => {
    console.log({ selectedLocation });
    setLocationData(selectedLocation);
    // Fetch new weather data based on selected location
  };

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onLocationSelect={handleLocationSelect} />
      <WeatherDisplay
        locationName={locationData.name}
        temperature={weatherData.current.temperature_2m}
        weatherInfo={getWeatherDataFromCode(
          weatherData.current.weather_code.toString() as WeatherCode,
          Boolean(weatherData.current.is_day)
        )}
      />
      {/* Add Weekly Forecast Component Here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default HomeScreen;
