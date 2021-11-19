import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Grid, IconButton} from '@material-ui/core';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';

const pickerStyle = {
    marginLeft: 'auto',
    marginRight: 'auto'
}

function CustomDateTimePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid alignContent="center" style={{ margin: "1em" }}>
            <h3> Select Date &amp; Time </h3>
            <DatePicker value={props.selectedDate} onChange={props.handleDateChange} />
            {props.selectedData == 'MTL' && (
              <TimePicker value={props.selectedDate} onChange={props.handleTimeChange}
              minutesStep={6} />
            )}
            <IconButton> <PlayCircleFilled /> </IconButton>
        </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default CustomDateTimePicker;