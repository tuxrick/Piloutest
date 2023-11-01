import React, { useState } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';

function Home() {

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Button variant="contained" color="primary" >
          Iniciar Sesión
        </Button>
        <Button variant="contained" color="primary" >
          Escanear QR
        </Button>
      </Paper>
    </Container>
  );
}

export default Home;
