import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styles from '../styles/Home.module.css'

export default function BottomNav(props) {
    return (      
    <BottomNavigation
        value={props.selected}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={styles.bottomNav}
      >
        <BottomNavigationAction label="Reports" icon={<TimelineIcon />} />
        <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Preferences" icon={<SettingsIcon />} />
    </BottomNavigation>
    );
}