/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import getStationsFromBounds from '../index'
import '@testing-library/jest-dom/extend-expect'
 
 describe('GetStationsFromBounds', () => {
   test("bounds", () => {
    var coeff = 1000 * 60 * 6;
    var date = new Date();
    var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)

     const input = {
       'width': 100,
       'height': 100,
       'time': rounded,
       'type': 'MTL'
     }

     const stations_url = "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=waterlevels&units=metric";
     const stations_promise = axios.get(stations_url);
     var stations = [];
     stations_promise.then((response) => {
         stations = response['data']['stations'];
     });

     const output = stations.filter((station) => {
      return (station.lat < nw.lat && station.lat > se.lat && station.lng < se.lng && station.lng > nw.lng);
    });

    expect(getStationsFromBounds(input)).toEqual(output);
   })
 })