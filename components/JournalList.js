import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import JournalEntry from './JournalEntry';
import NewEntryForm from './NewEntryForm';


export default function JournalList() {
  const [entries, setEntries] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    // Function to fetch entries from Supabase
    const fetchEntries = async () => {
      let { data: entries, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) console.log('error', error);
      else setEntries(entries);
    };

    fetchEntries();
  }, []);

  const handleAddEntry = (newEntry) => {
    const newId = entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
    setEntries([...entries, { ...newEntry, id: newId }]);
  };

  const handleDeleteEntry = async (id) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .delete()
      .match({ id });

    if (error) {
      alert('Error deleting entry:', error.message);
    } else {
      // Update the local state to remove the deleted entry
      setEntries(entries.filter(entry => entry.id !== id));
    }
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
    renderItem={({ item }) => (
      <JournalEntry entry={item} onDelete={handleDeleteEntry} />
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