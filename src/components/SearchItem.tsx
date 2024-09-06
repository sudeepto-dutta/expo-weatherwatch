import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface SearchResultItemProps {
  item: any;
  onSelect: (item: any) => void;
}

const SearchResultItem = ({item, onSelect}: SearchResultItemProps) => {
  return (
    <TouchableOpacity style={styles.resultItem} onPress={() => onSelect(item)}>
      <Text style={styles.resultText}>{item.name}</Text>
      <Text style={[styles.resultCountry]}>{item.country}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 16,
    flexWrap: 'wrap',
    width: '60%',
  },
  resultCountry: {
    textAlign: 'right',
  },
});

export default SearchResultItem;
