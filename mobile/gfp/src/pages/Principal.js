import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Principal({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Principal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
});

export default Principal;

