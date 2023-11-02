import React, { useState, useEffect } from 'react';
import {Container, Paper, Typography } from '@mui/material';
import Navbar from '../General/Navbar';

function UserInfo() {

  return (
    <>
      <Navbar/>
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop:"20px" }}>
          <Typography>User Info</Typography>
        </Paper>
      </Container>
    </>
  );
}

export default UserInfo;