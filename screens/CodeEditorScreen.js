// screens/EditorScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

function CodeEditorScreen() {
  const [output, setOutput] = useState('');

  const runCode = () => {
    // Simulate code execution
    setOutput('Code executed successfully');
  };

  const injectedJavaScript = `
    window.addEventListener("message", (event) => {
      if (event.data === 'executeCode') {
        const code = editor.getValue();
        window.ReactNativeWebView.postMessage(code);
      }
    });

    const editor = monaco.editor.create(document.getElementById('container'), {
      value: "// Write your code here",
      language: "javascript",
      theme: "vs-dark"
    });
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: editorHtml }}
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript}
        style={styles.webview}
        onMessage={(event) => {
          console.log(event.nativeEvent.data); // Handle code execution
        }}
      />
      <Button title="Run Code" onPress={() => runCode()} />
      <Text style={styles.output}>{output}</Text>
    </SafeAreaView>
  );
}

const editorHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monaco Editor</title>
    <style>
      #container {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js"></script>
    <script>
      require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});
      window.MonacoEnvironment = { getWorkerUrl: () => proxy };
      let proxy = URL.createObjectURL(new Blob([`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/'
        };
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/base/worker/workerMain.min.js');
      `], { type: 'text/javascript' }));
      require(['vs/editor/editor.main'], function () {
        window.editor = monaco.editor.create(document.getElementById('container'), {
          value: '// Write your code here',
          language: 'javascript',
          theme: 'vs-dark'
        });
      });
    </script>
  </head>
  <body>
    <div id="container"></div>
  </body>
  </html>
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  output: {
    padding: 10,
    backgroundColor: '#282C34',
    color: 'white',
  },
});

export default CodeEditorScreen;
