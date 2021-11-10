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
  		heatmapPoints: [
		  		{lat: 26.13167, lng: -81.80833},
					{lat: 26.64833, lng: -81.87167}
				]
  	}
  }

  onMapChange({ center, zoom, bounds, marginBounds }) {
    if (!this.state.heatmapVisible) {
      return
    }
    
    console.log("onChange");
    //this.socket.send(bounds, this.count++);
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

  	const apiKey = {key: 'AIzaSyBrP7CiMgD8kHYwIxKTU11FfP4CI0Gzfzw'}
  	const heatMapData = {
  		positions: this.state.heatmapPoints,
		options: {
			radius: 20,
			opacity: 0.6
		}
  	}

  	console.log(this.state)

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
          onChange={this.onMapChange.bind(this)}
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default HeatMap