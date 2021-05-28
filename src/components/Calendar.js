import React from 'react';

import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  calendar: {
    border: 'none',
  },
  report: {
    marginTop: 10
  }
}))

function CalendarComponent({ date, setDate, items, getChecks, changeCheck }) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const checks = getChecks('day');

  const percentCompleted = () => {

    if (items.length === 0){
      return 0
    }

    return ((checks.length / items.length) * 100).toFixed(2);
  }

  const getCheck = itemID => {
    if (checks === undefined){
      return false;
    }

    return checks.includes(itemID);
  }

  const classes = useStyles();

  return (
    <Grid container>

      <Grid item xs={4}>
        <Calendar
          onChange = {setDate}
          value = {date}
          view = {'month'}
          prev2Label = {null}
          next2Label = {null}
          showNavigation = {false}
          formatDay = {() => {""}}
          tileContent = {({ date }) => (<><Typography>{date.getDate()}</Typography></>)}
          className={classes.calendar}
        />

        <Typography variant="h4" className={classes.report}>
          {percentCompleted()}%
        </Typography>
      </Grid>

      <Grid item xs={8} container alignContent="space-between">
        <Grid item xs={10}>
          <Typography variant="h3">
            { months[date.getMonth()] } {date.getDate()}, {date.getFullYear()}
          </Typography>
          <List>
            { items.map(item => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Checkbox
                    checked={getCheck(item.id)}
                    onChange={() => changeCheck(date, item.id)}
                    color="primary"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                />
              </ListItem>
            )) }
          </List>
        </Grid>
        <Grid item xs={2}>
          <Button color="inherit" onClick={() => setDate(new Date())}>Today</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CalendarComponent;
