import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import { List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';

const Notifications = ({ ablyInstance, name }) => {
  const [notificationsHistory, setNotificationsHistory] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (ablyInstance) {
      const channel = ablyInstance?.channels?.get(name);
      channel.attach();
      channel.once('attached', () => {
        channel.history((err, page) => {
          const comments = Array.from(page.items, (item) => item);
          setNotificationsHistory(comments);
          channel.subscribe((msg) => {
            setNotificationsHistory((prevState) => [msg, ...prevState]);
          });
        });
      });
    }
  }, [ablyInstance, name]);

  return (
    <Fragment>
      <List className={classes.listRoot}>
        {notificationsHistory.map((message) => {
          return (
            <ListItem key={message.id} divider className={classes.itemList}>
              <div className={classes.messageContent}>
                <InfoIcon
                  className={classes.iconMessage}
                  fontSize='large'
                  color='primary'
                />
                <div className={classes.messageTexts}>
                  <Typography variant='h6'>Notification</Typography>
                  {message.data.length > 80 ? (
                    <Typography>
                      {`${message.data.slice(0, 80)}.`}{' '}
                      <span className={classes.readMore}> Read more.</span>
                    </Typography>
                  ) : (
                    <Typography>{message.data}</Typography>
                  )}
                </div>
              </div>
              <Typography className={classes.timestamp}>
                {moment(message.timestamp).format('YYYY-MM-DD hh:mm:ss a')}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  listRoot: {
    flex: 1,

    overflowY: 'auto',
  },
  itemList: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 87,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  messageContent: {
    flex: 1,
    display: 'flex',
  },
  iconMessage: {
    fontSize: 60,
  },
  messageTexts: {
    marginLeft: 10,
  },
  timestamp: {
    width: '100%',
    textAlign: 'right',
  },
  readMore: {
    textDecoration: 'underline',
    color: '#666',
    cursor: 'pointer',
  },
}));

export default Notifications;
