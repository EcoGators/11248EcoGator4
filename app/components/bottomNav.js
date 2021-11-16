import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styles from '../styles/Home.module.css'

export default function BottomNav(props) {
  const [value, setValue] = React.useState(0);
    return (      
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={styles.bottomNav}
      >
        <BottomNavigationAction label="Map" icon={<LocationOnIcon />} onclick={() => { window.location.href = "/"}} />
        <BottomNavigationAction label="Reports" icon={<TimelineIcon />} onclick={() => { window.location.href = "/reports" }} />
        <BottomNavigationAction label="Preferences" icon={<SettingsIcon />} />
    </BottomNavigation>
    );
}