import React, { Fragment, useEffect } from 'react';
import { Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  setPrivateRoom,
  deleteMember,
  setMember,
  deleteUserBadge,
} from '../../redux/actions/ably';
import UserListLarge from './UserListLarge';

const SwitchListUserResponsive = ({ userList, onClick }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fragment>
      {!match && (
        <Grid item xs={3}>
          <UserListLarge userList={userList} onClick={onClick} />
        </Grid>
      )}
    </Fragment>
  );
};

const ListUserOnline = () => {
  const ablyInstance = useSelector((state) => state.ablyInstance);
  const clientID = ablyInstance?.auth.clientId;
  const userList = useSelector((state) =>
    state.userList.filter((member) => member.clientId !== clientID)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const generalChannel = ablyInstance?.channels.get('general');
    if (generalChannel) {
      generalChannel.presence.get((err, members) => {
        if (err) {
          throw new Error('Error on get Users online');
        }
        members.forEach((element) => {
          if (clientID !== element.clientId) {
            dispatch(setMember(element));
          }
        });
      });

      generalChannel.presence.subscribe((member) => {
        if (member.action === 'leave') {
          dispatch(deleteMember(member));
        } else if (clientID !== member.clientId) {
          dispatch(setMember(member));
        }
      });
    }
  }, [ablyInstance, clientID, dispatch]);

  const onClick = (user) => {
    dispatch(setPrivateRoom(user));
    dispatch(deleteUserBadge(user.clientId));
  };
  return <SwitchListUserResponsive userList={userList} onClick={onClick} />;
};

export default ListUserOnline;
