import React, { useState } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';

function UserList() {

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography>User List</Typography>
      </Paper>
    </Container>
  );
}

export default UserList;