import {View, Text, Image, StyleSheet} from 'react-native';

interface WeatherDisplayProps {
  locationName: string;
  temperature: number;
  weatherInfo: {
    image: string;
    description: string;
  };
}

const WeatherDisplay = ({
  locationName,
  temperature,
  weatherInfo,
}: WeatherDisplayProps) => (
  <View style={styles.container}>
    <Text style={styles.locationName}>{locationName}</Text>
    <Text style={styles.temperature}>{temperature}°C</Text>
    {/* NOTE: The conditional rendering of Image below is done to demonstrate the test case
      under __tests_/WeatherDisplay.test.tsx that showcases testing with conditional rendering
      of Image element */}
    {weatherInfo.image && (
      <Image
        source={{uri: weatherInfo.image}}
        style={styles.image}
        testID="weather-image"
      />
    )}
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
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  tempHighLow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  tempHightLowText: {
    fontSize: 15,
  },
  weatherDescription: {
    fontSize: 15,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default WeatherDisplay;
