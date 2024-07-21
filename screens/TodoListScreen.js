import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Modal, Text, Alert, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Import moment.js for date formatting

const TodoListScreen = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://api.test/api/todo');
    setTodos(response.data.data);
  };

  const handleAddTodo = async () => {
    const response = await axios.post('http://api.test/api/todo', { title });
    setTitle('');
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    const response = await axios.delete(`http://api.test/api/todo/${id}`);
    fetchTodos();
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setTitle(todo.title);
    setEditModalVisible(true);
  };

  const handleUpdateTodo = async () => {
    if (currentTodo && title) {
      const response = await axios.put(`http://api.test/api/todo/${currentTodo.id}`, { title });
      setTitle('');
      setCurrentTodo(null);
      setEditModalVisible(false);
      fetchTodos();
    } else {
      Alert.alert('Error', 'Title cannot be empty');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{moment(item.created_at).format('YYYY-MM-DD')}</Text>
        <Text style={styles.dateTimeText}>{moment(item.created_at).format('HH:mm')}</Text>
      </View>
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#A5D6A7' }]}
          onPress={() => handleEditTodo(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'gray',marginLeft:20 }]}
          onPress={() => handleDeleteTodo(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Todo"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#A5D6A7' }]}
        onPress={handleAddTodo}
      >
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Todo Title"
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#A5D6A7' }]}
            onPress={handleUpdateTodo}
          >
            <Text style={styles.buttonText}>Update Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'gray' }]}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#A5D6A7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#666',
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default TodoListScreen;
