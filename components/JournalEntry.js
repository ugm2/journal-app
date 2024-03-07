import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Add onDelete prop to your component function
export default function JournalEntry({ entry, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={styles.entryContainer}>
      <Text style={styles.entryTitle}>{entry.title}</Text>
      <Text style={styles.entryDate}>{entry.date}</Text>
      <Text
        onPress={() => setIsExpanded(!isExpanded)}
        style={[
          styles.entryContent,
          isExpanded ? styles.expanded : styles.collapsed, // Apply different styles based on state
        ]}
      >
        {entry.content}
      </Text>
      <Button title="Delete" onPress={() => onDelete(entry.id)} />
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
  collapsed: {
    // Styles for collapsed text
    overflow: 'hidden', // Hide overflowed text
    maxHeight: 100, // Set a max height for collapsed state
  },
  expanded: {
    // No maxHeight here, let it expand fully
  },
});
