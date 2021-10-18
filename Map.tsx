import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView from 'react-native-maps';

interface IProfileProps {}

const Map: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <View style={styles.container}>
      <MapView style={{height: '100%', width: '100%'}} /> 
      <StatusBar style="auto" />
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});