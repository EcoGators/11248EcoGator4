import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const datums = [
    'Highest Astronomical Tide',
    'Mean Higher High Water',
    'Mean High Water',
    'Diurnal Tide Level',
    'Mean Tide Level',
    'Mean Sea Level',
    'Mean Low Water',
    'Mean Lower Low Water',
    'Lowest Astronomical Tide',
    'Great Diurnal Range',
    'Mean Range of Tide',
    'Mean Diurnal High Water Inequality',
    'Mean Diurnal Low Water Inequality',
    'Greenwich High Water Interval',
    'Greenwich Low Water Interval',
    'Highest Observed Tide',
    'Lowest Observed Tide',
    'Station Datum',
    'National Tidal Datum Epoch',
  ];

  function DatumDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select the datum to display</DialogTitle>
        <List sx={{ pt: 0 }}>
          {datums.map((datum) => (
            <ListItem button onClick={() => handleListItemClick(datum)} key={datum}>
              <ListItemText primary={datum} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }

  export default DatumDialog;