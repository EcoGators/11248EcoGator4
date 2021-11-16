import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';

export default function DataSelectionButtons(props) {
  const [view, setView] = React.useState('MTL');

  const handleChange = (event, nextView) => {
    props.onChange(nextView);
    setView(nextView);
  };

  const datums = ["HAT", "MHHW", "MHW", "DTL", "MTL", "MSL", "MLW", "MLLW", "LAT"]

  const datum_desc = {
    "HAT": "Highest Astronomical Tide",
    "MHHW": "Mean Higher High Water",
    "MHW": "Mean High Water",
    "DTL": "Dinural Tide Level",
    "MTL": "Mean Tide Level (6 min)",
    "MSL": "Mean Sea Level",
    "MLW": "Mean Low Water",
    "MLLW": "Mean Lower Low Water",
    "LAT": "Lowest Astronomical Tide"
  };

  return (
    <Paper
      elevation={3}
      style={{
      margin: 0,
      top: 'auto',
      right: 'auto',
      bottom: 75,
      left: 20,
      position: 'fixed',
      backgroundColor: '#fff',
    }}>
      <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        value={view}
        exclusive
        required
        onChange={handleChange}
        size="large"
      >
        {datums.map((datum) => {
          return (
            <Tooltip title={datum_desc[datum]} key={datum + "-tooltip"}>
              <ToggleButton
                key={datum}
                value={datum}
                aria-label={datum}
                label={datum}
                style={{
                  padding: "0.25em",
                }}
              >
                {datum}
              </ToggleButton>
            </Tooltip>
          );
        })}
      </ToggleButtonGroup>
    </Paper>
  );
}
