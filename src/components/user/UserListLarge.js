import React, { Fragment } from 'react';
import {
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  List,
  ListItem,
  IconButton,
  Divider,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Close } from '@material-ui/icons';
import UserBadge from './UserBadge';

const UserListLarge = ({ userList, onClick, closeButton = false, onClose }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper
        variant='outlined'
        square
        style={{
          height: '100%',
        }}
      >
        <div className={classes.headerDrawer}>
          <span>Users</span>
          {closeButton && (
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          )}
        </div>
        <Divider />
        <List>
          {userList.map((user) => (
            <ListItem
              divider
              key={user.connectionId}
              component='span'
              onClick={() => onClick(user)}
              className={classes.itemList}
            >
              <ListItemAvatar>
                <AccountCircleIcon />
              </ListItemAvatar>
              <ListItemText primary={user.clientId} />
              <ListItemText
                primary={<UserBadge userList={userList} user={user} />}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Fragment>
  );
};

const useStyles = makeStyles({
  itemList: {
    cursor: 'pointer',
  },
  headerDrawer: {
    display: 'flex',
    textAlign: 'start',
    '& > span': {
      padding: 20,
      alignSelf: 'center',
      flex: 1,
    },
  },
});

export default UserListLarge;
