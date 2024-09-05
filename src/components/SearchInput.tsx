import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
}

const SearchInput = ({
  searchText,
  setSearchText,
  onSearch,
}: SearchInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search location..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchIcon}>
        <Text style={styles.searchIconText}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%', // Adjust the width to leave space for the "X" button
  },
  input: {
    flex: 1,
  },
  searchIcon: {
    padding: 5,
  },
  searchIconText: {
    fontSize: 20,
  },
});

export default SearchInput;
