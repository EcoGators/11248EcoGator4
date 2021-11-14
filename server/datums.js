// By: Yuko Matsumoto from commit - 9c9ef06
const axios = require("axios");

const baseUrl = "https://api.tidesandcurrents.noaa.gov/";

async function getWaterLevel(begin_date, end_date, datum, station, timeZone) {
	let url =
		baseUrl +
		`api/prod/datagetter?product=water_level&begin_date=${begin_date}&end_date=${end_date}&station=${station}&datum=${datum}&time_zone=${timeZone}&units=english&format=json`;
	return axios.get(url);
}

function getWaterLevels(begin_date, end_date, datum, stations, timeZone) {
	let promises = [];
	for (let station of stations) {
		promises.push(getWaterLevel(begin_date, end_date, datum, station, timeZone));
	}
	return Promise.all(promises);
}

async function getPrediction(date, time, datum, station, timeZone) {
	let predUrl =
		baseUrl +
		`api/prod/datagetter?product=predictions&begin_date=${date}&end_date=${date}&station=${station}&datum=${datum}&time_zone=${timeZone}&units=english&format=json`;
	let metaUrl = baseUrl + `mdapi/prod/webapi/stations/${station}.json`;
	let resp = await Promise.all([axios.get(predUrl), axios.get(metaUrl)]);
	let value = resp[0].data.predictions.find(
		(val) => val.t.split(" ")[1] == time
	).v;
	return {
		lat: resp[1].data.stations[0].lat,
		lng: resp[1].data.stations[0].lng,
		value: parseFloat(value),
	};
}

function getPredictions(date, time, datum, stations, timeZone) {
	let promises = [];
	for (let station of stations) {
		promises.push(getPrediction(date, time, datum, station, timeZone));
	}
	return Promise.all(promises);
}

module.exports = {
	getWaterLevel,
	getWaterLevels,
	getPrediction,
	getPredictions,
};