import 'react-native';
import App from '../App';
import {render, screen, waitFor} from '@testing-library/react-native';

it('should render the App with HomeScreen', async () => {
  render(<App />);

  // Wait for the HomeScreen component to be rendered
  await waitFor(() => expect(screen.getByTestId('home-screen')).toBeTruthy());
});
