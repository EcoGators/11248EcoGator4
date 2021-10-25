import React, { Component } from 'react';
import Canvas from 'react-native-canvas'; // 0.1.20
import { Dimensions } from 'react-native';

// Get Width and Height
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HeatmapCanvas extends Component {

    handleCanvas = (canvas) => {
        // Set width
        canvas.width = windowWidth;
        canvas.height = windowHeight;

        const ctx = canvas.getContext('2d');
        ctx.fillColor = 'purple';
        ctx.fillRect(10, 10, canvas.width, canvas.height);
    }

    render() {
        return (
            <Canvas ref={this.handleCanvas}
            style={{
                width: "100%",
                height: 700,
                backgroundColor: 'black'
            }}/>
        )
    }
}