import React, { Fragment, useState } from 'react';
import { makeStyles, Drawer, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPrivateRoom, deleteUserBadge } from '../../redux/actions/ably';
import UserListLarge from '../user/UserListLarge';

const IconMenu = ({ clientID }) => {
  const source = useSelector((state) =>
    state.userList.filter((member) => member.clientId !== clientID)
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const click = (user) => {
    close();
    dispatch(setPrivateRoom(user));
    dispatch(deleteUserBadge(user.clientId));
  };

  const clickUser = (e) => {
    close();
    click(e);
  };
  return (
    <Fragment>
      {source.length ? (
        <IconButton
          size='small'
          color='inherit'
          className={classes.menuRoot}
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      {source.length ? (
        <IconButton
          size='small'
          color='inherit'
          className={classes.menuRoot}
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <UserListLarge
          userList={source}
          onClick={clickUser}
          closeButton
          onClose={close}
        />
      </Drawer>
    </Fragment>
  );
};

const useStyles = makeStyles({
  menuRoot: {
    right: 0,
    top: 0,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 300,
  },
});

export default IconMenu;
