import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function DataSelectionButtons(props) {
  const [view, setView] = React.useState('MTL');

  const handleChange = (event, nextView) => {
    props.onChange(nextView);
    setView(nextView);
  };

  const datums = ["HAT", "MHHW", "MHW", "DTL", "MTL", "MSL", "MLW", "MLLW", "LAT"]

  return (
    <ToggleButtonGroup
      orientation="vertical"
      color="primary"
      value={view}
      exclusive
      required
      onChange={handleChange}
      style={{
        margin: 0,
        top: 'auto',
        right: 'auto',
        bottom: 75,
        left: 20,
        position: 'fixed',
        backgroundColor: '#fff',
      }}
      size="large"
    >      
      {datums.map((datum) => {
        return (
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
        );
      })}
    </ToggleButtonGroup>
  );
}