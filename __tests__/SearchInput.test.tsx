import {fireEvent, render, screen} from '@testing-library/react-native';
import SearchInput from '../src/components/SearchInput';

describe('SearchInput', () => {
  it('renders the search input field with correct placeholder', () => {
    render(
      <SearchInput
        searchText=""
        setSearchText={() => {}}
        onSearch={() => {}}
      />,
    );
    const input = screen.getByPlaceholderText('Search location...');
    expect(input).toBeTruthy();
  });
  it('displays search icon when text is entered', () => {
    const setSearchText = jest.fn();
    render(
      <SearchInput
        searchText="London"
        setSearchText={setSearchText}
        onSearch={() => {}}
      />,
    );
    const searchIcon = screen.getByText('🔍');
    expect(searchIcon).toBeTruthy();
  });
  it('calls onSearch function when search icon is pressed', () => {
    const onSearch = jest.fn();
    render(
      <SearchInput
        searchText="London"
        setSearchText={() => {}}
        onSearch={onSearch}
      />,
    );
    const searchIcon = screen.getByText('🔍');
    fireEvent.press(searchIcon);
    expect(onSearch).toHaveBeenCalled();
  });
});
