import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  leftNavigation: {
    textAlign: 'right'
  },
  rightNavigation: {
    textAlign: 'left'
  },
  monthName: {
    textAlign: 'center'
  }
}))

function Month({ date, setDate, items, getChecks, changeCheck }){

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const checks = getChecks('month', date);

  const classes = useStyles();

  const percentCompleted = () => {

    let totalChecks = 0;
    for (const check in checks){
      totalChecks += checks[check].length;
    }

    let dateToCheck;

    if (new Date().getMonth() === date.getMonth()){
      dateToCheck = new Date().getDate()
    }

    else {
      dateToCheck = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
    }

    if (items.length === 0){
      return 0
    }

    return ((totalChecks/(items.length*dateToCheck))*100).toFixed(2);
  }

  const changeDate = offset => {
    setDate(prevDate => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth()+offset, 1);
    })
  }

  const getCheck = (tableDate, itemID) => {
    const dateKey = (tableDate+1).toString();

    if (checks[dateKey] === undefined){
      return false;
    }

    return checks[dateKey].includes(itemID);
  }

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={2} className={classes.leftNavigation}>
          <Button color="inherit" size="large" onClick={() => changeDate(-1)}>&lt;&lt;</Button>
        </Grid>
        <Grid item xs={2} className={classes.monthName}>
          <Typography variant="h4">
            { months[date.getMonth()] } {date.getFullYear()}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.rightNavigation}>
          <Button color="inherit" size="large" onClick={() => changeDate(1)}>&gt;&gt;</Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5">
            {percentCompleted()}%
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" width={1}>SN</TableCell>
              <TableCell width={10}>Item</TableCell>
              { [...Array(new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()).keys()].map(tableDate => (
                <TableCell key={tableDate+1}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tableDate+1}</TableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="right">{index+1}</TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                { [...Array(new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()).keys()].map(tableDate => (
                  <TableCell key={tableDate+1} align="right">
                    <Checkbox
                      checked={getCheck(tableDate, item.id)}
                      onChange={() => changeCheck(new Date(date.getFullYear(), date.getMonth(), tableDate+1), item.id)}
                      color="primary"
                    />
                  </TableCell>
                )) }
              </TableRow>
            )) }

          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  )
}

export default Month;
