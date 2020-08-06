import React, { useEffect } from 'react';
import { Realtime } from 'ably';
import { makeStyles, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import ABLY_KEY from '../../ably';

import { setAblyInstance } from '../../redux/actions/ably';
import Notifications from '../layout/Notifications';
import InputSend from '../chat/InputSend';

const ably = new Realtime({ key: ABLY_KEY, clientId: 'admin' });
const channel = 'general';

const Admin = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(setAblyInstance(ably));
  }, [dispatch]);

  useEffect(() => {
    const general = ably.channels.get(channel);
    general.presence.enterClient(ably.clientId);

    return () => {
      ably.close();
    };
  }, []);

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Notifications ablyInstance={ably} name={channel} />
      <InputSend ablyInstance={ably} name={channel} />
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '99vh',
    opacity: 1,
  },
});

export default Admin;
