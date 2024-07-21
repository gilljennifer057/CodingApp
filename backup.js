import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  Text,
} from "react-native";
import { DataTable, IconButton, Provider } from "react-native-paper"; // Import Provider from react-native-paper
import axios from "axios";

const NoteScreen = ({ route, navigation }) => {
  const { mode } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfItemsPerPageList] = useState([5, 10, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const fetchNotes = () => {
    let per_page = 100;
    axios
      .get(`http://api.test/api/note?per_page=${per_page}`)
      .then((response) => {
        setNotes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const handleSaveNote = () => {
    axios
      .post("http://api.test/api/note", {
        title,
        description,
      })
      .then((response) => {
        console.log("Note saved successfully:", response.data.data);
        setTitle("");
        setDescription("");
        fetchNotes();
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  };

  const handleDeleteNote = (id) => {
    axios
      .delete(`http://api.test/api/note/${id}`)
      .then((response) => {
        console.log("Note deleted successfully:", response.data);
        fetchNotes();
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setEditModalVisible(true);
  };

  const handleUpdateNote = () => {
    axios
      .put(`http://api.test/api/note/${currentNote.id}`, {
        title,
        description,
      })
      .then((response) => {
        console.log("Note updated successfully:", response.data.data);
        setTitle("");
        setDescription("");
        setEditModalVisible(false);
        fetchNotes();
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, notes.length);

  return (
    <Provider> {/* Wrap your root component with Provider */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          multiline
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Save Note" onPress={handleSaveNote} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          {notes.slice(from, to).map((note) => (
            <DataTable.Row key={note.id}>
              <DataTable.Cell>{note.title}</DataTable.Cell>
              <DataTable.Cell>{note.description}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="pencil"
                  color="blue"
                  size={20}
                  onPress={() => handleEditNote(note)}
                />
                <IconButton
                  icon="delete"
                  color="red"
                  size={20}
                  onPress={() => handleDeleteNote(note.id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(notes.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${notes.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>

        <Modal
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Note</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              multiline
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Button title="Update Note" onPress={handleUpdateNote} />
            <Button
              title="Cancel"
              onPress={() => setEditModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    </Provider>
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
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default NoteScreen;
