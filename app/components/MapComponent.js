import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps"

const testData = [
    {
        lat: -81.80833, 
        lng: 26.13167,
        weight: 2.4
    },
    {
        lat: -81.87167, 
        lng: 26.64833,
        weight: -1.4
    },
];

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})


const MapComponent = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    ref={(map) => { console.log(map); }}
    defaultZoom={10}
    defaultCenter={props.mapCenter}
    onIdle={() => props.onIdle()}
    heatmap={testData}
  >
    <Marker position={props.mapCenter} />
    <OverlayView 
        position={props.mapCenter} 
        getPixelPositionOffset={getPixelPositionOffset}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
        <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
            <h1>OverlayView</h1>
        </div>
    </OverlayView>
  </GoogleMap>
));

export default MapComponent;