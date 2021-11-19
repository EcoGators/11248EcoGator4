/* global google */
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

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
  		heatmapPoints: [],
      currentBounds: null
  	}
    this.socket = props.socket;
    this.socket.on('data', (data) => {
      this.setState({heatmapPoints: data});
    })
    this.onMapUpdate = props.onMapChange;
  }

  onMapChange({ center, zoom, bounds, marginBounds }) {
    this.onMapUpdate(bounds, this.state.heatmapVisible);
    this.setState({currentBounds: bounds});
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
        radius: 75,
        opacity: 0.4
      }
  	}

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // heatmapLibrary={true}
          // heatmap={heatMapData}
          overlay={() => {
          }}
          onChange={this.onMapChange.bind(this)}
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default HeatMap