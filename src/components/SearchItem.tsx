import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SearchResultItemProps {
  item: any;
  onSelect: (item: any) => void;
}

const SearchResultItem = ({ item, onSelect }: SearchResultItemProps) => {
  return (
    <TouchableOpacity style={styles.resultItem} onPress={() => onSelect(item)}>
      <Text style={styles.resultText}>{item.name}</Text>
      <Text style={[styles.resultText, { textAlign: "right" }]}>
        {item.country}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default SearchResultItem;
