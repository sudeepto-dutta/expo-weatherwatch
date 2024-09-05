import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface WeatherDisplayProps {
  locationName: string;
  temperature: number;
  weatherInfo: {
    image: string,
    description: string, 
  };
}

const WeatherDisplay = ({ locationName, temperature, weatherInfo }: WeatherDisplayProps) => (
    <View style={styles.container}>
        <Text style={styles.locationName}>{locationName}</Text>
        <Text style={styles.temperature}>{temperature}°C</Text>
        {/* TODO: If possible, add High & Low Temperature for the current day */}
        {/* <View style={styles.tempHighLow}>
          <Text style={styles.tempHightLowText}>H: {temperature}°C</Text>
          <Text style={styles.tempHightLowText}>L: {temperature}°C</Text>
        </View> */}
        <Image source={{ uri: weatherInfo.image }} style={styles.image} />
        <Text style={styles.weatherDescription}>{weatherInfo.description}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  locationName: {
    fontSize: 20,
  },
  temperature: {
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: 'center'
  },
  tempHighLow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  tempHightLowText: {
    fontSize: 15,
  },
  weatherDescription: {
    fontSize: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default WeatherDisplay;
