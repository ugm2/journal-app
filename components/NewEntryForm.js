import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const handleSubmit = () => {
    if (title && content) {
      onAddEntry({ title, content, date: formatDate(date) });
      setTitle('');
      setContent('');
      setDate(new Date());
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
        style={styles.input}
        multiline
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
});

export default NewEntryForm;
