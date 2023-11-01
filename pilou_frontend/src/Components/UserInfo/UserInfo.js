import React, { useState } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';

function UserInfo() {

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography>User Info</Typography>
      </Paper>
    </Container>
  );
}

export default UserInfo;