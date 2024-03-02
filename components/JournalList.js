import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import JournalEntry from './JournalEntry';

const entries = [
  {
    id: 1,
    title: 'Entry 1',
    date: '2022-01-01',
    content: 'This is entry 1',
  },
  {
    id: 2,
    title: 'Entry 2',
    date: '2022-01-02',
    content: 'This is entry 2',
  },
];

export default function JournalList() {
  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <JournalEntry entry={item} />}
    />
  );
}

// Add styles if necessary
