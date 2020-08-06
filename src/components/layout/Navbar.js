import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import IconMenu from './IconMenu';

const Navbar = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(search);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const close = () => {
    history.push({ pathname });
  };

  return (
    <Fragment>
      {urlSearchParams.get('name') && (
        <AppBar position='static'>
          <Toolbar>
            <div style={{ flexGrow: 1 }} />
            <Box textAlign='right'>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={close}
              >
                <ExitToApp />
              </IconButton>
              {match ? <IconMenu /> : null}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
};

export default Navbar;
