import React, { useState } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';

function UserRegister() {

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography>User Register</Typography>
      </Paper>
    </Container>
  );
}

export default UserRegister;