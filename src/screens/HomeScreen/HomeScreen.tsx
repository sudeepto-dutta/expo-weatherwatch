import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {fetchWeatherData} from '../../api/api';
import {WeatherData} from '../../types/WeatherData';
import {DEFAULT_LAT_LONG, DEFAULT_CITY} from '../../constants';
import {WeatherCode} from '../../helpers/getWeatherImage';
import WeatherDisplay from '../../components/WeatherDisplay';
import SearchBar from '../SearchBar/SearchBar';
import getWeatherDataFromCode from '../../helpers/getWeatherImage';
import WeeklyForecast from '../../components/WeeklyForecast';

const HomeScreen: React.FC = () => {
  const {latitude, longitude} = DEFAULT_LAT_LONG;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  }>({latitude, longitude, name: DEFAULT_CITY});
  const latitudeRef = useRef<number | null>(null);
  const longitudeRef = useRef<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    latitudeRef.current = latitude;
    longitudeRef.current = longitude;
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitudeRef.current !== null && longitudeRef.current !== null) {
      getWeather(latitudeRef.current, longitudeRef.current);
    }
  }, []);

  const getWeather = async (lat: number, long: number) => {
    try {
      const data = await fetchWeatherData(lat, long);
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data', err);
    }
  };

  const handleLocationSelect = (selectedLocation: {
    latitude: number;
    longitude: number;
    name: string;
  }) => {
    console.log({selectedLocation});
    setLocationData(selectedLocation);
    setModalVisible(false);
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
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.searchIconText}>🔍</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        style={styles.searchModal}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <SearchBar
            onClose={() => setModalVisible(false)}
            onLocationSelect={handleLocationSelect}
          />
        </View>
      </Modal>
      <WeatherDisplay
        locationName={locationData.name}
        temperature={weatherData.current.temperature_2m}
        weatherInfo={getWeatherDataFromCode(
          weatherData.current.weather_code.toString() as WeatherCode,
          Boolean(weatherData.current.is_day),
        )}
      />
      <WeeklyForecast daily={weatherData.daily} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  searchIcon: {position: 'absolute', top: 10, right: 10, padding: 10},
  searchIconText: {fontSize: 24},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 20,
  },
  searchModal: {backgroundColor: '#ccc'},
});

export default HomeScreen;
