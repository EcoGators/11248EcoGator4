import Head from 'next/head'
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core'
import BottomNav from '../components/bottomNav'
import HeatMap from '../components/HeatMap';
import React, { Component } from 'react';
import { io } from 'socket.io-client';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import DataSelectionButtons from '../components/DataSelectionButtons';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      center: {lat: 0, lng: 0},
      hasLocation: false,
      selectedData: 'MTL'
    }
    var coeff = 1000 * 60 * 6;
    var date = new Date();
    var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)

    this.socket = io("ws://localhost:8080");
    this.socket.on('data', (data) => {
      console.log(data);
    })
    this.count = 0;
    this.state.selectedDate = rounded;
    this.socket.send({date: rounded, time: rounded});
    this.handleDateChange = (val) => {
      console.log(val);
      this.state.time = new Date();
    }

    this.datum_desc = {
      "HAT": "Highest Astronomical Tide",
      "MHHW": "Mean Higher High Water",
      "MHW": "Mean High Water",
      "DTL": "Dinural Tide Level",
      "MTL": "Mean Tide Level (6 min)",
      "MSL": "Mean Sea Level",
      "MLW": "Mean Low Water",
      "MLLW": "Mean Lower Low Water",
      "LAT": "Lowest Astronomical Tide"
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position);
      this.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}, hasLocation: true})
    });
  }

  render() {
    return (
      <Grid>
        <Head>
          <title>The Tide Atlas</title>
          <meta name="description" content="Developed by EcoGators" />
          <link rel="icon" href="/favicon.ico" />
          <script src="https://cdn.socket.io/socket.io-3.0.0.js" type="text/javascript" />
        </Head>

        <main>
          {this.state.hasLocation && <HeatMap
            socket={this.socket}
            onMapChange={(bounds, isVisible) => {
              if (!isVisible) {
                return
              }

              bounds['width'] = window.innerWidth;
              bounds['height'] = window.innerHeight;
              bounds['time'] = this.state.selectedDate;
              if (this.state.selectedData) {
                bounds['type'] = this.state.selectedData;
              }

              this.socket.send(bounds);
            }}
          />}
          {!this.state.hasLocation && <CircularProgress/>}

          <Paper
            elevation={3}
            style={{
            position: 'fixed',
            top: 'auto',
            bottom: '75px',
            left: '90px',
            right: 'auto',
            zIndex: '1000',
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '10px',
          }}>
            <Typography variant="h5" align="center">
              {this.datum_desc[this.state.selectedData]}
            </Typography>
          </Paper>

          <DataSelectionButtons
            onChange={(value) => {
              this.setState({selectedData: value})
            }} />
          <Paper
          elevation={3}
          style={{
            margin: 0,
            top: 'auto',
            right: 75,
            bottom: 75,
            left: 'auto',
            position: 'fixed',
          }}>
            <CustomDateTimePicker
              handleDateChange={(v) => {
                this.socket.send({date: v});
                this.setState({selectedDate: v});
              }}
              handleTimeChange={(v) => {
                this.socket.send({time: v});
                this.setState({selectedDate: v});
              }}
              selectedDate={this.state.selectedDate}
              selectedData={this.state.selectedData}
            />
          </Paper>

          <BottomNav/>
        </main>

      </Grid>
    )
  }
}
