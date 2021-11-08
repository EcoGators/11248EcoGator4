const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: '*' }
})

// BACKEND SETUP
const stations_url = "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=waterlevels&units=metric";

// Get all stations
var stations = [
    {id: 123456, lat: 12, lng: 12, value: 0.67}
]

const bounds = {
    tl: {lat: -69, lng: 69},
    br: {lat: -67, lng: 67},
}

// Define a function that gets stations based of lognitude and latitude bounds
function getStationsFromBounds(bounds) {
    // Gets all stations in bounds_

    return [1611400, ]
}

// LOOP
io.on('connection', (socket) => {

    socket.on('message', (message) => {
        console.log('Recieved: ', message);
    })

});

http.listen(8080, () => console.log('Server listening on 8080'));