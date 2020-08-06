import React, { useEffect, Fragment } from 'react';
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { setUserBadge } from '../../redux/actions/ably';
import commonRoomName from '../../utils/commonName';

const UserBadge = ({ user, userList }) => {
  const dispatch = useDispatch();
  const ablyInstance = useSelector((state) => state.ablyInstance);
  const userBadgeList = useSelector((state) => state.userBadgeList);

  useEffect(() => {
    if (ablyInstance) {
      userList.forEach((element) => {
        const chName = commonRoomName(
          ablyInstance?.auth.clientId,
          element.clientId
        );
        const channel = ablyInstance?.channels.get(chName);
        channel.attach();
        channel.once('attached', () => {
          channel.subscribe('chat', (msg) => {
            dispatch(setUserBadge(msg.clientId));
          });
        });
      });
    }
  }, [ablyInstance, userList, dispatch]);

  return (
    <Fragment>
      {userBadgeList.some((badge) => badge === user.clientId) ? (
        <Badge color='error' variant='dot'>
          <MailIcon />
        </Badge>
      ) : null}
    </Fragment>
  );
};

export default UserBadge;
