import Head from 'next/head'
import Image from 'next/image'
import { Grid, Fab, CircularProgress, Paper } from '@material-ui/core'
import { TimePicker } from '@material-ui/pickers';
import styles from '../styles/Home.module.css'
import BottomNav from '../components/bottomNav'
import HeatMap from '../components/HeatMap';
import PollIcon from '@material-ui/icons/Poll';
import React, { Component, Fragment } from 'react';
import { io } from 'socket.io-client';
import CustomDateTimePicker from '../components/CustomDateTimePicker';

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
    this.state = {
      center: {lat: 0, lng: 0},
      hasLocation: false,
    }
    var coeff = 1000 * 60 * 6;
    var date = new Date();
    var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)

    this.socket = io("ws://localhost:8080");
    this.count = 0;
    this.state.selectedDate = rounded;
    this.socket.send({date: rounded, time: rounded});
    this.handleDateChange = (val) => {
      console.log(val);
      this.state.time = new Date();
    }
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
              console.log("changed", bounds);
              if (!isVisible) {
                return
              }
          
              bounds['width'] = window.innerWidth;
              bounds['height'] = window.innerHeight;
              bounds['time'] = this.state.selectedDate;
              
              console.log(bounds);
              this.socket.send(bounds);
            }}
          />}
          {!this.state.hasLocation && <CircularProgress/>}
          <Fab 
            style={{
              margin: 0,
              top: 'auto',
              right: 'auto',
              bottom: 75,
              left: 20,
              position: 'fixed',
            }} 
            size="large" 
            color="primary"
            onClick={() => {
              // this.socket.send("Fab Clicked");
            }}
            >
              <PollIcon />
          </Fab>
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
            />
          </Paper>

          <BottomNav/>
        </main>

      </Grid>
    )
  }
}