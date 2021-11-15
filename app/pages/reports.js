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

          <BottomNav/>
        </main>

      </Grid>
    )
  }
}