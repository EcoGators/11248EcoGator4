# 11248EcoGator4
## The Tide Atlas 

Data-driven web application for reading and understanding the effects of tides in your area. View heat maps and tide charts showing current tides and tide predictions in a visual and intuitive format.

Member1: Kyle James Dampier (Product Manager)

Member2: Yuko Matsumoto (Scrum Master)

Member3: Hyeongbeen Joo (Development Team)

Member4: Dylan Morrissey (Development Team)

## Required Tools

The only required tool to run this program is [Docker](https://docs.docker.com/get-docker/) since all required packages are installed automatically during the Docker build.

## Running Program

Simply install Docker, clone the repository and run this command `docker-compose up --build`.
This will build the docker containers and run the webserver at `http://localhost:3000` and the websocket at `http://localhost:8080`.

---------
# Documentation

## Socket Protocols

The socket is created using this function:

`io.on('connection', (socket) => { ... });`

### BACKEND to FRONTEND

The backend sends the frontend two things: the actual data used to generate the data and the scaled/generated data

The **frontend** recieves the backed data using this function:

`socket.on('data', (data) => { ... } );`

The **backend** calls the fronend using the function:

`socket.emit('data', <outputData>);`

The data the backend sends to the frontend conatins data in this format:

``` javascript
{
    stations: [
        {
            lng: double, // station longitude
            lat: double, // station latitude
            name: String, // station name
            value: double, // station value
        }, ...
    ],
    heatmap: [
        {
            lng: double, // longitude
            lng: double, // latitude
            weight: double // calculated weight
        }, ...
    ]
}
```

`stations` are represented as cloud icons on the map and has tooltips displaying the contents of station.`name` and station.`value`

`heatmap` is represented on the frontend in the heatmap its weight is taken taken into account from heatmap[i].`weight`

### FRONTEND to BACKEND

The frontend uses one socket for communication using Socket.io.
We open a socket  and using the function:

 `socket.on('message', (data) => { ... } );`

This function runs everytime the fronend calls the socket on the frontend using this function:

`socket.send(updatedFrontendData);`

When the message in the function is received, the function seperates the data by checking for null values in data. So multiple updates can be sent simultaneously.

`if (message.hasOwnProperty(<property>)) {`

Here are the currently handled properties:

- `'nw' && 'se'` 
  - The NorthWest and SouthEast properties respectively
  - Downloads data based on bounded area
- `'time'`
  - The current date and time selected by the user in the date picker
  - JavasScript Date() object
- `'date'`
  - The current date selected by the user in the date picker
  - JavasScript Date() object

