import React, { useEffect, useState, Fragment } from 'react';
import {
  FormControl,
  TextField,
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Realtime } from 'ably';

import ABLY_KEY from '../../ably';

import { setPrivateRoom, setAblyInstance } from '../../redux/actions/ably';
import PanelChat from '../chat/PanelChat';

const User = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { search, pathname } = useLocation();
  const history = useHistory();
  const url = new URLSearchParams(search);

  useEffect(() => {
    if (url.get('name') && !name) {
      setName(url.get('name'));
      const ably = new Realtime({ key: ABLY_KEY, clientId: url.get('name') });
      dispatch(setAblyInstance(ably));
    }
  }, [name, search, url, dispatch]);

  const close = () => {
    dispatch(setPrivateRoom(null));
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onClick = () => {
    setName('');
    url.set('name', name);
    history.push({
      pathname,
      search: url.toString(),
    });
  };

  return (
    <Fragment>
      {url.get('name') ? (
        <PanelChat handleClose={close} />
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.FormControl}>
                <TextField
                  size='medium'
                  variant='standard'
                  label='Name'
                  placeholder='user name'
                  name={name}
                  onChange={onChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                color='primary'
                variant='contained'
                onClick={onClick}
              >
                register
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: '25% auto',
    border: 'solid 1px #ccc',
    padding: 40,
  },
  FormControl: {
    width: '100%',
  },
});

export default User;
