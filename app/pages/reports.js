import Head from 'next/head'
import { Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react';
import BottomNav from '../components/bottomNav';

export default class Reports extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

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
            <Typography variant="h3" align="center" gutterBottom margin={{ top: "1em" }}> Reports </Typography>
            <hr />

          <div style={{ display: 'flex' }}>
          <Chart
            width={400}
            height={300}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: 'number', label: 'x' },
                { type: 'number', label: 'values' },
                { id: 'i0', type: 'number', role: 'interval' },
                { id: 'i1', type: 'number', role: 'interval' },
                { id: 'i2', type: 'number', role: 'interval' },
                { id: 'i2', type: 'number', role: 'interval' },
                { id: 'i2', type: 'number', role: 'interval' },
                { id: 'i2', type: 'number', role: 'interval' },
              ],
              [1, 100, 90, 110, 85, 96, 104, 120],
              [2, 120, 95, 130, 90, 113, 124, 140],
              [3, 130, 105, 140, 100, 117, 133, 139],
              [4, 90, 85, 95, 85, 88, 92, 95],
              [5, 70, 74, 63, 67, 69, 70, 72],
              [6, 30, 39, 22, 21, 28, 34, 40],
              [7, 80, 77, 83, 70, 77, 85, 90],
              [8, 100, 90, 110, 85, 95, 102, 110],
            ]}
            options={{
              intervals: { style: 'sticks' },
              legend: 'none',
            }}
            />
        </div>

          <BottomNav/>
        </main>

      </Grid>
    )
  }
}