import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { grey } from '@material-ui/core/colors';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(grey[300]),
    backgroundColor: grey[300],
  },
  shortList: {
    width: '50%',
    marginTop: theme.spacing(2),
  }
}))

function Items({ date, setDate, items, addEditItem, handleCopyPress}){

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [fieldItem, setFieldItem] = useState('');
  const [buttonContent, setButtonContent] = useState('Add');

  const changeDate = offset => {
    setDate(prevDate => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth()+offset, 1);
    })
  }

  const handleAddEdit = (date, fieldItem) => {
    addEditItem(date, fieldItem);
    setFieldItem({id: 0, name: ''});
    setEditing(false);
  }

  const handleEditAddPress = (action, item) => {
    if (action === 'add'){
      setFieldItem({id: 0, name: '', months: []});
      setButtonContent('Add');
    }

    else if (action === 'edit'){
      setFieldItem(item);
      setButtonContent('Edit');
    }

    setEditing(true);
  }

  return (
    <Container className={classes.root}>

      <Grid container>
        <Grid item xs={2}>
          <Button color="inherit" size="large" onClick={() => changeDate(-1)}>&lt;&lt;</Button>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4">
            { months[date.getMonth()] } {date.getFullYear()}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button color="inherit" size="large" onClick={() => changeDate(1)}>&gt;&gt;</Button>
        </Grid>
      </Grid>

      <List className={classes.shortList}>
        { items.map((item, index) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar className={classes.smallAvatar}>
                {index+1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditAddPress('edit', item)}
              >
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => handleCopyPress([item.id])}
              >
                <Tooltip title="Copy to current month">
                  <FileCopyIcon />
                </Tooltip>
              </IconButton>

            </ListItemSecondaryAction>
          </ListItem>
        )) }
        <ListItem>
          <ListItemAvatar>
            <IconButton
              edge="end"
              aria-label="add"
              onClick={() => handleEditAddPress('add', {})}
            >
              <Tooltip title="Add">
                <AddCircleIcon />
              </Tooltip>
            </IconButton>
          </ListItemAvatar>

          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="copy-all"
              onClick={() => handleCopyPress(items.map(item => (item.id)))}
            >
              <Tooltip title="Copy all items to current month">
                <FileCopyIcon />
              </Tooltip>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      {editing &&
        <>
          <TextField
            autoFocus={true}
            label="Item"
            value={fieldItem.name}
            onChange={event => { setFieldItem(prevFieldItem => ({...prevFieldItem, name: event.target.value})) }}
          />
          <Button onClick={() => handleAddEdit(date, fieldItem)}>{buttonContent}</Button>
        </>
      }
    </Container>
  )
}

export default Items;
