// screens/MainScreen.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  const handleAddNote = () => {
    // Navigate to NoteScreen for adding a new note
    navigation.navigate('Note', { mode: 'add' });
  };

  return (
    <View style={styles.container}>
   
      <SearchBar
        placeholder="Search notes..."
        lightTheme
        round
        containerStyle={styles.searchBar}
        inputContainerStyle={{ backgroundColor: '#fff' }}
      />
        <Icon
        raised
        reverse
        name="add"
        type="material"
        color="#A5D6A7"
        containerStyle={styles.addButton}
        onPress={handleAddNote}
      />
      <View style={styles.content}>
        <Text style={styles.header}>Notepad App</Text>
        {/* List of notes can go here */}
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  addButton: {
    alignItems:"center",
  },
});

export default HomeScreen;
