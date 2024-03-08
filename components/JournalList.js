import React, { useState, useEffect } from 'react';
import { fetchEntries, deleteEntry } from '../services/journalService';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import JournalEntry from './JournalEntry';
import NewEntryForm from './NewEntryForm';


export default function JournalList() {
  const [entries, setEntries] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchEntries();
      setEntries(entries);
    };
    getEntries();
  }, []);

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

  const handleDeleteEntry = async (id) => {
    const { error } = await deleteEntry(id);
    if (error) {
      alert('Error deleting entry:', error.message);
    } else {
      // Update the local state to remove the deleted entry
      setEntries(currentEntries => currentEntries.filter(entry => entry.id !== id));
    }
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
    renderItem={({ item }) => (
      <JournalEntry entry={item} onDelete={() => handleDeleteEntry(item.id)} />
    )}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});