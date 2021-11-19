/* global google */
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { io } from 'socket.io-client';
import GeneratedHeatMap from '../components/GeneratedHeatMap';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import Tooltip from '@mui/material/Tooltip';

class HeatMap extends Component {
  static defaultProps = {
    center: {
      lat: 28,
      lng: -82
    },
    zoom: 8
  }

  constructor(props) {
  	super(props)
  	this.state = {
      heatmapVisible: true,
  		heatmapPoints: [
		  		{lat: 26.13167, lng: -81.80833, weight: 1.2},
					{lat: 26.64833, lng: -81.87167, weight: 0.7}
				],
      stations: []
  	}
    this.socket = props.socket;
    this.socket.on('data', (data) => {
      this.setState({heatmapPoints: data['heatmap'], stations: data['stations']});
    })
    this.onMapUpdate = props.onMapChange;
  }

  onMapChange({ center, zoom, bounds, marginBounds }) {
    this.onMapUpdate(bounds, this.state.heatmapVisible);
  }

  toggleHeatMap() {
    this.setState({
      heatmapVisible: !this.state.heatmapVisible
    }, () => {
      if (this._googleMap !== undefined) {
        this._googleMap.heatmap.setMap(this.state.heatmapVisible ? this._googleMap.map_ : null)
      }
    })

  }

  render() {
    console.log(this.state);
  	const apiKey = { key: 'AIzaSyBrP7CiMgD8kHYwIxKTU11FfP4CI0Gzfzw' }
  	const heatMapData = {
  		positions: this.state.heatmapPoints,
      options: {
        radius: 5,
        opacity: 0.4
      }
  	}

    return (
      <div style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
          overlay={() => {

          }}
          onChange={this.onMapChange.bind(this)}
        >
          {this.state.stations.map((station) => {
            return (
              <Tooltip title={station.name + ": " + station.value + "ft"} lat={station.lat} lng={station.lng}>
                <CloudCircleIcon />
              </Tooltip>
            );
          })}
        </GoogleMapReact>
      </div>
    )
  }
}

export default HeatMap
