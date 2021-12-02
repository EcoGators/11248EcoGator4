const express = require("express");
const datums = require("./datums");

const app = express();
const port = 8080;

app.get("/waterlevels", (req, res) => {
	const date = req.query.date;
	const time = req.query.time;
	const datum = req.query.datum;
	let stations = req.query.station;
	if (!date || !time || !datum || !stations) {
		res.status(400).send("400 Bad Request");
		return;
	}
	if (!Array.isArray(stations)) {
		stations = [stations];
	}
	datums
		.getWaterLevels(date, time, datum, stations, "LST_LDT")
		.then((result) => res.send(result));
});

app.get("/predictions", (req, res) => {
	const date = req.query.date;
	const time = req.query.time;
	const datum = req.query.datum;
	let stations = req.query.station;
	if (!date || !time || !datum || !stations) {
		res.status(400).send("400 Bad Request");
		return;
	}
	if (!Array.isArray(stations)) {
		stations = [stations];
	}
	datums
		.getPredictions(date, time, datum, stations, "LST_LDT")
		.then((result) => res.send(result));
});

app.listen(port);
