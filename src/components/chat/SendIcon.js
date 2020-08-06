import React, { Fragment } from 'react';
import { InputAdornment, makeStyles, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  sendIcon: {
    cursor: 'pointer',
  },
});

const SendIconComp = ({ onClick, text }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {text ? (
        <InputAdornment className={classes.sendIcon}>
          <IconButton onClick={onClick}>
            <SendIcon fontSize='large' color='primary' />
          </IconButton>
        </InputAdornment>
      ) : null}
    </Fragment>
  );
};

export default SendIconComp;
