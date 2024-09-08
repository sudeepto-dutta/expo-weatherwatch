import {render, screen} from '@testing-library/react-native';
import WeatherDisplay from '../src/components/WeatherDisplay';

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

  it('displays weather image correctly', () => {
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

    const image = screen.getByTestId('weather-image');
    expect(image.props.source.uri).toBe(weatherInfo.image);
  });

  it('handles missing weather image gracefully', () => {
    const locationName = 'London';
    const temperature = 15;
    const weatherInfo = {
      image: '',
      description: 'Partly cloudy',
    };

    render(
      <WeatherDisplay
        locationName={locationName}
        temperature={temperature}
        weatherInfo={weatherInfo}
      />,
    );

    const image = screen.queryByTestId('weather-image');
    expect(image).toBeNull();
  });

  it('handles negative temperatures correctly', () => {
    const locationName = 'London';
    const temperature = -5;
    const weatherInfo = {
      image: 'https://example.com/weather-image.png',
      description: 'Snowy',
    };

    render(
      <WeatherDisplay
        locationName={locationName}
        temperature={temperature}
        weatherInfo={weatherInfo}
      />,
    );

    expect(screen.getByText(`${temperature}°C`)).toBeTruthy();
  });
});
