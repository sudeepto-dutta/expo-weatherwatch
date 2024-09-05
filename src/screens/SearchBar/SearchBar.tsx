import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {fetchGeocodingData, fetchWeatherData} from '../../api/api';
import {DEFAULT_LAT_LONG} from '../../constants';
import SearchInput from '../../components/SearchInput';
import SearchResultItem from '../../components/SearchItem';

interface SearchBarProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    name: string;
  }) => void;
  onClose: () => void;
}

const SearchBar = ({onLocationSelect, onClose}: SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const {latitude, longitude} = DEFAULT_LAT_LONG;

  const handleSearch = async () => {
    try {
      const data = await fetchGeocodingData(searchText);
      if (data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error fetching geocoding data', err);
    }
  };

  const handleItemSelect = async (selectedLocation: any) => {
    try {
      const weatherData = await fetchWeatherData(
        selectedLocation?.latitude ?? latitude,
        selectedLocation?.longitude ?? longitude,
      );
      onLocationSelect({
        latitude: weatherData.latitude,
        longitude: weatherData.longitude,
        name: selectedLocation.name,
      });
      onClose();
    } catch (err) {
      console.error('Error fetching weather data', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <Text style={styles.closeIconText}>✕</Text>
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && (
        <FlatList
          style={{width: '100%'}}
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SearchResultItem item={item} onSelect={handleItemSelect} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeIcon: {
    padding: 10,
  },
  closeIconText: {
    fontSize: 20,
  },
});

export default SearchBar;
