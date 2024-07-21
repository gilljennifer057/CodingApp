// screens/EditorScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { SyntaxHighlighter } from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'; // Adjust the path here

const EditorScreen = () => {
  const [code, setCode] = useState('');

  const handleRunCode = () => {
    // Placeholder function to handle running code
    console.log(code);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={code}
        onChangeText={setCode}
        placeholder="Write your code here"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <SyntaxHighlighter language="javascript" style={docco}>
        {code}
      </SyntaxHighlighter>
      <Button title="Run Code" onPress={handleRunCode} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  textInput: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    fontFamily: 'monospace',
  },
});

export default EditorScreen;
