import React from 'react';
import { StyleSheet, View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView, {Heatmap, Overlay, WeightedLatLng} from 'react-native-maps';

interface IProfileProps {}

const Map: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{height: '100%', width: '100%'}}
        initialRegion={{
          latitude: 25,
          longitude: -80,
          latitudeDelta: 6,
          longitudeDelta: 8,
        }}
      /> 
      <Overlay image={require('./test_figure.png')} bounds={[[25, -80], [31, -88]]} tappable={true}/>
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
})