import { Image, StyleSheet, Text, View } from 'react-native';
import { fetchWeatherData } from './src/api/api';
import { useEffect, useState } from 'react';
import { WeatherData } from './src/types/WeatherData';
import { DEFAULT_COORDINATES } from './src/constants';

export default function App() {
  const { LATITUDE, LONGITUDE } = DEFAULT_COORDINATES
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  useEffect(() => {
    const getWeather = async () => {
      try {
        /* Default coordinates for London City. */
        const data = await fetchWeatherData(LATITUDE, LONGITUDE); 
        setWeatherData(data);
      } catch (err) {
        // setError('Error fetching weather data');
      }
    };

    getWeather();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>{weatherData?.timezone}</Text>
      <Text>{weatherData?.current?.temperature_2m}</Text>
      <Text>Image Representation of the current weather</Text>
      <Text>Weekly weather forecast for the selected location</Text>
      <Text>For the weekly forecast of the selected location, we need to show the average temperature</Text>
      <Text>We also need to show the image that best represents the weather of the day</Text>
      <Image style={{width: 50, height: 50}} srcSet={'https://hatscripts.github.io/circle-flags/flags/in.svg'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
