import React, { useState, useEffect } from 'react';

import Calendar from './components/Calendar';
import Month from './components/Month';
import Items from './components/Items';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { saveContent, getContent, getNextID } from './storage';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
  }
}))

function App() {

  // views = ['calendar', 'month', 'items']
  const [view, setView] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState(() => {
    const items = getContent('items');
    if (items === null){
      return [];
    }

    else {
      return items;
    }
  });

  const [checks, setChecks] = useState(() => {
    const checks = getContent('checks');
    if (checks === null){
      return {}
    }

    else {
      return checks;
    }
  });

  useEffect(() => {
    saveContent('items', items);
  }, [items]);

  useEffect(() => {
    saveContent('checks', checks);
  }, [checks]);

  const nextID = item => {
    return getNextID('items');
  }

  const handleCopyPress = items => {
    items.forEach(item => {
      setItems(prevItems => {
        let newItems = [];

        prevItems.forEach(prevItem => {
          if (prevItem.id === item){
            newItems.push(
              {
                id: prevItem.id,
                name: prevItem.name,
                months: [...prevItem.months, new Date().getMonth().toString() + "-" + new Date().getYear().toString()]
              }
            );
          }
          else {
            newItems.push(prevItem);
          }
        })

        return newItems;
      })
    })
  }

  const addEditItem = (date, newItem) => {
    if (newItem.id === 0){
      setItems(prevItem => {
        return [ ...prevItem, {
          id: nextID('item'),
          name: newItem.name,
          months: [date.getMonth().toString() + "-" + date.getYear().toString()]
        }]
      })
    }

    else {
      setItems(prevItems => {
        let newItems = [];
        prevItems.forEach(item => {
          if(item.id === newItem.id){
            newItems.push({
              id: item.id,
              name: newItem.name,
              months: item.months
            })
          }
          else {
            newItems.push(item);
          }
        })
        return newItems;
      })
    }
  }

  const changeCheck = (dateToChange, itemID) => {
    setChecks(prevChecks => {

      const monthKey =
        dateToChange.getMonth().toString() + "-" +
        dateToChange.getYear().toString();

      const dateKey =
        dateToChange.getDate().toString();

      let prevChecksArray;
      let prevChecksObject;

      prevChecksObject = {...prevChecks};

      if (prevChecks[monthKey] === undefined){
        prevChecksObject[monthKey] = {}
      }

      if (prevChecksObject[monthKey][dateKey] === undefined){
        prevChecksArray = [];
      }

      else {
        prevChecksArray = prevChecksObject[monthKey][dateKey];
      }

      let newChecks = {...prevChecksObject};
      if (prevChecksArray.includes(itemID)){
        newChecks[monthKey][dateKey] = prevChecksArray.filter(item => item !== itemID)
      }

      else{
        newChecks[monthKey][dateKey] = [...prevChecksArray, itemID];
      }

      return newChecks;

    })
  }

  const getChecks = (checksFor, dateToFetch) => {
    const checksMonth = date.getMonth().toString() + "-" + date.getYear().toString();

    if(checksFor === 'month'){
      if (checksMonth in checks){
        return checks[checksMonth];
      }
      else {
        return [];
      }
    }

    else if(checksFor === 'day') {
      const checksDay = date.getDate().toString();

      if (checksMonth in checks && checksDay in checks[checksMonth]){
        return checks[checksMonth][checksDay];
      }

      else {
        return [];
      }
    }
  }

  const classes = useStyles();

  return (
      <Container maxWidth="lg" className={classes.root}>
        <AppBar
          position="static"
          color="inherit"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Checklist App
            </Typography>
            <Button color="inherit" onClick={() => setView('calendar')}>Calendar</Button>
            <Button color="inherit" onClick={() => setView('month')}>Month</Button>
            <Button color="inherit" onClick={() => setView('items')}>Items</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          { (view === 'calendar') &&
            <Calendar
              date={date}
              setDate={setDate}
              items={items.filter(item => item.months.includes(date.getMonth().toString() + "-" + date.getYear().toString()))}
              getChecks={getChecks}
              changeCheck={changeCheck}
            />
          }

          { (view === 'month') &&
            <Month
              date={date}
              setDate={setDate}
              items={items.filter(item => item.months.includes(date.getMonth().toString() + "-" + date.getYear().toString()))}
              changeCheck={changeCheck}
              getChecks={getChecks}
            />
          }

          { (view === 'items') &&
            <Items
              date={date}
              setDate={setDate}
              items={items.filter(item => item.months.includes(date.getMonth().toString() + "-" + date.getYear().toString()))}
              addEditItem={addEditItem}
              handleCopyPress={handleCopyPress}
            />
          }
        </Container>
      </Container>
  );
}

export default App;
