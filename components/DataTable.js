// components/DataTable.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataTable = ({ data }) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.header]}>ID</Text>
        <Text style={[styles.tableCell, styles.header]}>Title</Text>
        <Text style={[styles.tableCell, styles.header]}>Description</Text>
      </View>
      {data.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.tableCell}>{item.id}</Text>
          <Text style={styles.tableCell}>{item.title}</Text>
          <Text style={styles.tableCell}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
});

export default DataTable;
