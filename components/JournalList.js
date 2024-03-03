import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import JournalEntry from './JournalEntry';
import NewEntryForm from './NewEntryForm';

const initialEntries = [
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
  const [entries, setEntries] = useState(initialEntries);
  const [sortAscending, setSortAscending] = useState(true);

  const handleAddEntry = (newEntry) => {
    const newId = entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
    setEntries([...entries, { ...newEntry, id: newId }]);
  };

  const handleSortEntries = () => {
    const sortedEntries = [...entries].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAscending ? dateB - dateA : dateA - dateB; // toggle the sort order
    });
    setEntries(sortedEntries);
    setSortAscending(!sortAscending); // toggle the sorting state
  };

  return (
    <View style={styles.container}>
      <NewEntryForm onAddEntry={handleAddEntry} />
      <Button
        title={`Sort by Date ${sortAscending ? 'Descending' : 'Ascending'}`}
        onPress={handleSortEntries}
      />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JournalEntry entry={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});