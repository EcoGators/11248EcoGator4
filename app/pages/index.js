import Head from 'next/head'
import Image from 'next/image'
import { Container, Grid, Typography, Fab, CircularProgress } from '@material-ui/core'
import styles from '../styles/Home.module.css'
import BottomNav from '../components/bottomNav'
import PollIcon from '@material-ui/icons/Poll';
import React, { Component } from 'react';
import { io } from 'socket.io-client';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps"

const testData = [
    {
        lat: -81.80833, 
        lng: 26.13167,
        weight: 2.4
    },
    {
        lat: -81.87167, 
        lng: 26.64833,
        weight: -1.4
    },
];

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.socket = io("ws://localhost:8080");
    this.socket.on('message', (data) => {
      console.log("socket data", data);
    });
    this.state = {
      center: {lat: 0, lng: 0},
      hasLocation: false,
    }
    this.count = 0;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position);
      this.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}, hasLocation: true})
    });
  }

  render() {
    console.log("render");
    const MapComponent = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        ref={(map) => { console.log(map); }}
        defaultZoom={10}
        defaultCenter={props.mapCenter}
        onIdle={() => props.onIdle}
        heatmap={testData}
      >
        <Marker position={props.mapCenter} />
      </GoogleMap>
    ));

    return (
      <Grid>
        <Head>
          <title>The Tide Atlas</title>
          <meta name="description" content="Developed by EcoGators" />
          <link rel="icon" href="/favicon.ico" />
          <script src="https://cdn.socket.io/socket.io-3.0.0.js" type="text/javascript" />
        </Head>

        <main>
          {this.state.hasLocation && <MapComponent 
            containerElement={<div style={{position: 'fixed', bottom: 55, left: 0, right: 0, top: 0}} />}
            mapElement={<div style={{ height: `100%` }} />}
            loadingElement={<CircularProgress />}
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBrP7CiMgD8kHYwIxKTU11FfP4CI0Gzfzw&v=3.exp&libraries=places,visualization"}
            mapCenter={this.state.center}
            onIdle={() => {
              console.log("onIdle");
              let nw = this.map.getBounds().getNorthWest();
              let se = this.map.getBounds().getSouthEast();
              this.socket.send("[[" + nw.lat() + ", " + nw.lng() + "], [" + se.lat() + ", " + se.lng() + "]]", this.count++);
            }}
          />}
          {!this.state.hasLocation && <CircularProgress />}
        </main>

        <Fab 
            style={{
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 75,
              left: 'auto',
              position: 'fixed',
            }} 
            size="large" 
            color="primary"
            onClick={() => {
              this.socket.send("Fab Clicked");
            }}
            >
            <PollIcon />
        </Fab>

        <BottomNav selected={1} />
      </Grid>
    )
  }
}
