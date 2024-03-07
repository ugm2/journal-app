import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../supabase';

const NewEntryForm = ({ onAddEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    if (title && content) {
      // Add the entry to Supabase
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          { title, content, date: formatDate(date) },
        ])
        .select();
  
      if (error) {
        alert('Error saving entry:', error.message);
      } else {
        onAddEntry(data[0]); // Assuming onAddEntry will now update the state with the new entry including the id from Supabase
        setTitle('');
        setContent('');
        setDate(new Date());
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <Button onPress={showDatepicker} title="Pick a date" />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline={true} // Enable multiline input
        style={styles.textInput}
        // Additional props for Android for better experience
        underlineColorAndroid="transparent" // Prevents the underline on Android
        textAlignVertical="top" // Ensures that text starts from the top
      />
      <Button title="Add Entry" onPress={handleSubmit} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {/* Show selected date */}
      <Text>Date: {formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    height: undefined, // Removes fixed height
    maxHeight: 200, // You can set the maximum height
  },
});

export default NewEntryForm;
