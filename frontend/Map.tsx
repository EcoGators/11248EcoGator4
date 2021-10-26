import React from 'react';
import { StyleSheet, View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView, { Overlay, OverlayComponent } from 'react-native-maps';

interface IProfileProps {}
interface IMapState {
  loaded: boolean;
  image?: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
class Map extends React.Component<IProfileProps, IMapState> {

  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      loaded: false,
      image: null,
    };
  }

  componentDidMount() {
    let request = fetch("https://imgur.com/JzUyXpX")
    request.then((response) => {
      this.setState({image: response.blob, loaded: true});
    })
  }

  render() {
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
          
          onRegionChangeComplete={(event) => {
            console.log(event);
          }}
        >

          {this.state.loaded && (
            <Overlay 
              image={require("./test_figure.png")}
              bounds={[[26.826722, -82.444167], [26.016734, -81.309390]]}
              style={{
                
              }}
              tappable={false} />
          )}

        </MapView>
        <StatusBar style="auto" />
      </View>
    );
  }

};
export default Map;