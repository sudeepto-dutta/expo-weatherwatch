import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { fetchGeocodingData, fetchWeatherData } from "../../api/api";
import { DEFAULT_LAT_LONG } from "../../constants";

interface SearchBarProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    name: string;
  }) => void;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const { latitude, longitude } = DEFAULT_LAT_LONG;
  const handleSearch = async () => {
    try {
      const data = await fetchGeocodingData(searchText);
      if (data.results.length > 0) {
        // TODO: Based on user selection not the first choice always
        const selectedLocation = data.results[0];
        const weatherData = await fetchWeatherData(
          selectedLocation?.latitude ?? latitude,
          selectedLocation?.longitude ?? longitude
        );
        onLocationSelect({
          latitude: weatherData.latitude,
          longitude: weatherData.longitude,
          name: selectedLocation.name,
        });
      }
    } catch (err) {
      console.error("Error fetching geocoding data", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});

export default SearchBar;
