const datums = require("./datums");
const http = require('http').createServer();
const axios = require("axios");
const io = require('socket.io')(http, {
    cors: { origin: '*' }
})

const port = 8080;

// BACKEND SETUP
const stations_url = "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=waterlevels&units=metric";
const stations_promise = axios.get(stations_url);
var stations = [];
stations_promise.then((response) => {
    stations = response['data']['stations'];
});

// Get all stations
// var stations = [
//     {id: 123456, lat: 12, lng: 12, value: 0.67}
// ]

const bounds = {
    nw: { lat: 30.26977518549468, lng: -84.62294643788536 },
    se: { lat: 23.897173070765405, lng: -78.31679409413536 },
    sw: { lat: 23.897173070765405, lng: -84.62294643788536 },
    ne: { lat: 30.26977518549468, lng: -78.31679409413536 }
}

// Define a function that gets stations based of lognitude and latitude bounds
function getStationsFromBounds(bounds) {
    const nw = bounds['nw'];
    const se = bounds['se'];

    return stations.filter((station) => {
        return (station.lat < nw.lat && station.lat > se.lat && station.lng < se.lng && station.lng > nw.lng);
    });
}

// var current_bounds = 
var station_data_in_bounds = [];
var current_bounds = {};
var current_selected_date_time = new Date();
var current_values = []; // {id, lat, lng, weight}
var stations_in_bounds = [];
var width = 800;
var height = 800;
var latDiff = 0;
var lngDiff = 0;

// LOOP
io.on('connection', (socket) => {
    current_selected_date_time = new Date();

    socket.on('message', async (message) => {

        if (message.hasOwnProperty('nw') && message.hasOwnProperty('se')) {
            console.log('Recieved bounds: ', message);
            width = message['width'];
            height = message['height'];

            latDiff = message['nw'].lat - message['se'].lat;
            lngDiff = message['se'].lng - message['nw'].lng;

            current_bounds['nw'] = message['nw'];
            current_bounds['se'] = message['se'];

            stations_in_bounds = getStationsFromBounds(message);

            let now = current_selected_date_time;
            const end_date = "" + now.getFullYear() + String("00" + now.getMonth()).slice(-2) + String("00" + now.getDate()).slice(-2);
            const begin_date = "" + now.getFullYear() + String("00" + now.getMonth()).slice(-2) + String("00" + now.getDate()).slice(-2);
            
            const output = await Promise.all(stations_in_bounds.map(async (s) => {
                let stationData = await datums.getWaterLevel(begin_date, end_date, "MLLW", s.id, "LST_LDT");
                return stationData.data;
            }));

            station_data_in_bounds = output;
        }

        if (message.hasOwnProperty("time")) {
            let t = new Date(message['time']);
            current_selected_date_time.setTime(t.getTime());
            current_values = [];

            for (let k in station_data_in_bounds) {
                let s = station_data_in_bounds[k];

                current_values[k] = s.data.find((d) => {
                    let t = new Date(d.t);
                    return t.getHours() == current_selected_date_time.getHours() &&
                            t.getMinutes() == current_selected_date_time.getMinutes();
                });
                current_values[k]["id"] = s.metadata.id;
                current_values[k]["lat"] = s.metadata.lat;
                current_values[k]["lng"] = s.metadata.lon;
            }
        }
        
        if (message.hasOwnProperty("date")) {
            let t = new Date(message['date']);
            current_selected_date_time = t;

            let now = t;
            const end_date = "" + now.getFullYear() + String("00" + now.getMonth()).slice(-2) + String("00" + now.getDate()).slice(-2);
            const begin_date = "" + now.getFullYear() + String("00" + now.getMonth()).slice(-2) + String("00" + now.getDate()).slice(-2);
            
            const output = await Promise.all(stations_in_bounds.map(async (s) => {
                let stationData = await datums.getWaterLevel(begin_date, end_date, "MLLW", s.id, "LST_LDT");
                return stationData.data;
            }));

            station_data_in_bounds = output;
        }

        if (current_bounds['se'] && current_bounds['nw'] && current_values.length > 0) {
            // generate heatmap data
            let output_data = [];
            const denom = 50;

            for (let i = 0; i < height/denom; i++) {
                for (let j = 0; j < width/denom; j++) {
                    let latitude = current_bounds['se'].lat + latDiff * (i * denom + denom/2) / height;
                    let longitude = current_bounds['nw'].lng + lngDiff * (j * denom + denom/2) / width;

                    let distances = [];

                    for (let a in current_values) {
                        // localize long/lat
                        let x1 = (current_values[a].lat - current_bounds['se'].lat) * (height / denom);
                        let x2 = (latitude - current_bounds['se'].lat) * (height / denom);
                        let y1 = current_values[a].lng - current_bounds['nw'].lng * (width / denom);
                        let y2 = longitude - current_bounds['nw'].lng * (width / denom);

                        let dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                        distances.push(dist);
                    }

                    const dist_sum = distances.reduce((a,b) => a + b, 0);
                    let weight = 0;
                    
                    for (let b in distances) {
                        let d = distances[b];
                        let v = current_values[b]['v'];

                        weight += v * dist_sum - d / dist_sum * distances.length;
                    }

                    output_data.push({lat: latitude, lng: longitude, weight: weight});
                }
            }

            console.log("sending data");
            socket.emit('data', 
            [...current_values.map(({lat, lng, v}) => ({ lat: lat, lng: lng, weight: v })), 
                ...output_data]);
        }

    })

});

http.listen(port, () => console.log('Server listening on', port));