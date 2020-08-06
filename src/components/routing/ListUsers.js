import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

import ListUserOnline from '../user/ListUserOnline';

const ListUsers = (WrappedComponent) => (props) => {
  return (
    <Fragment>
      <Grid
        container
        style={{
          height: '90%',
        }}
      >
        <Grid item xs={12} md={9} style={{ height: '100%' }}>
          <WrappedComponent {...props} />
        </Grid>
        <ListUserOnline />
      </Grid>
    </Fragment>
  );
};

export default ListUsers;
