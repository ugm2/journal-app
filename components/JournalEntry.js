import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JournalEntry({ entry }) {
  return (
    <View style={styles.entryContainer}>
      <Text style={styles.entryTitle}>{entry.title}</Text>
      <Text style={styles.entryDate}>{entry.date}</Text>
      <Text style={styles.entryContent}>{entry.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 12,
    color: 'grey',
  },
  entryContent: {
    fontSize: 16,
  },
});
