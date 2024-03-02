import React from 'react';
import { StyleSheet, View } from 'react-native';
import JournalList from './components/JournalList';

export default function App() {
  return (
    <View style={styles.container}>
      <JournalList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
