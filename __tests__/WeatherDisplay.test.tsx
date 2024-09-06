import {render, screen} from '@testing-library/react-native';
import WeatherDisplay from '../src/components/WeatherDisplay'; // Ensure this import is correct

describe('WeatherDisplay', () => {
  it('renders the location name, temperature, and weather description', () => {
    const locationName = 'London';
    const temperature = 15;
    const weatherInfo = {
      image: 'https://example.com/weather-image.png',
      description: 'Partly cloudy',
    };

    render(
      <WeatherDisplay
        locationName={locationName}
        temperature={temperature}
        weatherInfo={weatherInfo}
      />,
    );

    expect(screen.getByText(locationName)).toBeTruthy();
    expect(screen.getByText(`${temperature}°C`)).toBeTruthy();
    expect(screen.getByText(weatherInfo.description)).toBeTruthy();
  });
});
