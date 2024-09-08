import {fireEvent, render, screen} from '@testing-library/react-native';
import SearchResultItem from '../src/components/SearchItem';

describe('SearchResultItem', () => {
  it('renders the search result item with correct data', () => {
    const item = {name: 'London', admin1: 'England', country: 'United Kingdom'};
    render(<SearchResultItem item={item} onSelect={() => {}} />);
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('England, United Kingdom')).toBeTruthy();
  });
  it('calls onSelect function when item is pressed', () => {
    const onSelect = jest.fn();
    const item = {name: 'London', admin1: 'England', country: 'United Kingdom'};
    render(<SearchResultItem item={item} onSelect={onSelect} />);
    fireEvent.press(screen.getByText('London'));
    expect(onSelect).toHaveBeenCalledWith(item);
  });
  it('handles missing admin1 data correctly', () => {
    const item = {name: 'London', country: 'United Kingdom'};
    render(<SearchResultItem item={item} onSelect={() => {}} />);
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('United Kingdom')).toBeTruthy();
  });
});
