import React, { useEffect, memo, Fragment } from 'react';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import PrivateChateMessage from './PrivateChateMessage';
import Notifications from '../layout/Notifications';
import { setAblyInstance } from '../../redux/actions/ably';

const PanelChat = ({ close }) => {
  const dispatch = useDispatch();
  const ablyInstance = useSelector((state) => state.ablyInstance);
  const privateChatRoom = useSelector((state) => state.privateChatRoom);

  useEffect(() => {
    let channel;
    if (ablyInstance) {
      channel = ablyInstance?.channels.get('general');
      channel.presence.enterClient(ablyInstance?.auth.clientId);
    }

    return () => {
      if (ablyInstance && channel) {
        channel.presence.leave(ablyInstance?.auth.clientId);
        ablyInstance.close();
        dispatch(setAblyInstance(null));
      }
    };
  }, [ablyInstance, dispatch]);

  return (
    <Fragment>
      <Grid
        container
        style={{
          height: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          sm={7}
          style={{
            height: '100%',
          }}
        >
          <PrivateChateMessage
            ablyInstance={ablyInstance}
            room={privateChatRoom}
            close={close}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            backgroundColor: 'white',
            borderLeft: 'solid 1px #ccc',
          }}
        >
          <Box padding={2} alignItems='center' textAlign='center'>
            <Typography variant='h6'>System messages</Typography>
          </Box>
          <Divider />
          <Notifications ablyInstance={ablyInstance} name='general' />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default memo(PanelChat);
