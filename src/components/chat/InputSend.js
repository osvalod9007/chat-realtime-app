import React, { useState, Fragment } from 'react';
import { makeStyles, FormControl, TextField, Box } from '@material-ui/core';
import SendIconComp from './SendIcon';

const InputSend = ({ ablyInstance, name, event = 'notifications' }) => {
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if (message) {
      if (ablyInstance) {
        const channel = ablyInstance.channels.get(name);
        channel.publish(event, message, (err) => {
          if (err) {
            throw new Error(err.message);
          }
        });
        setMessage('');
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };
  return (
    <Fragment>
      <Box width='100%'>
        <FormControl className={classes.formControl} size='medium'>
          <TextField
            variant='outlined'
            size='medium'
            label='write a text to send'
            value={message}
            onChange={onChange}
            placeholder='write a text to send'
            onKeyDown={onKeyDown}
            InputProps={{
              endAdornment: <SendIconComp onClick={onClick} text={message} />,
            }}
          />
        </FormControl>
      </Box>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default InputSend;
