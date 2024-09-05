import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {WeatherData} from '../types/WeatherData';
import getWeatherDataFromCode, {WeatherCode} from '../helpers/getWeatherImage';

interface WeeklyForecastProps {
  daily: WeatherData['daily'];
}

const WeeklyForecast = ({daily}: WeeklyForecastProps) => (
  <View style={styles.container}>
    {daily.time.map((time, index) => {
      const weatherInfo = getWeatherDataFromCode(
        daily.weather_code[index].toString() as WeatherCode,
        true,
      );

      const dayOfWeek = new Date(time).toLocaleDateString('en-US', {
        weekday: 'short',
      });

      return (
        <View key={index} style={styles.item}>
          <View style={styles.dayContainer}>
            <Text style={styles.day}>{dayOfWeek}</Text>
          </View>
          <View style={styles.weatherInfoContainer}>
            <Image
              source={{uri: weatherInfo.image}}
              style={styles.weatherImage}
            />
            <Text style={styles.weatherDescription} numberOfLines={2}>
              {weatherInfo.description}
            </Text>
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
              {Math.round(
                (daily.temperature_2m_max[index] +
                  daily.temperature_2m_min[index]) /
                  2,
              )}
              °C
            </Text>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayContainer: {
    flex: 2,
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  weatherImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  weatherDescription: {
    fontSize: 15,
    width: '75%',
  },
  temperatureContainer: {
    flex: 2,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 16,
    width: 50,
  },
});

export default WeeklyForecast;
