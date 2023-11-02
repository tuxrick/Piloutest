import React, { useState } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';
import Navbar from '../General/Navbar';
import {registerUser} from '../../Services/ServiceList';

function UserRegister() {

  const [userInfo, setUserInfo] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_type: '',
  });

  const [incorrectData, setIncorrectData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };  

  function cleanForm(){
    setUserInfo({
      name: '',
      last_name: '',
      email: '',
      password: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      blood_type: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const register_user_data = await registerUser(userInfo)
      .then((data) => {
        setIncorrectData(false);
        cleanForm();
        alert("Usuario registrado correctamente");
        console.log('Datos del usuario:', userInfo);
      })
      .catch((error) => {
        setIncorrectData(true);
        console.error('Error al enviar datos:', error);
      });
  };

  return (
    <>
    <Navbar/>
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop:"20px" }}>
        <Typography>User Register</Typography>
        <br/>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            variant="outlined"
            value={userInfo.nombre}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="last_name"
            variant="outlined"
            value={userInfo.last_name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            value={userInfo.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            variant="outlined"
            value={userInfo.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contacto de emergencia"
            name="emergency_contact_name"
            variant="outlined"
            value={userInfo.emergency_contact_name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Número de contacto de emergencia"
            name="emergency_contact_phone"
            variant="outlined"
            value={userInfo.emergency_contact_phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tipo de sangre"
            name="blood_type"
            variant="outlined"
            value={userInfo.blood_type}
            onChange={handleChange}
            margin="normal"
          />
          <br/>
          {incorrectData &&
            <Typography variant="body1" gutterBottom>
              Los datos ingresados son incorrectos o el usuario ya está registrado
            </Typography>
          }
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar Usuario
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
}

export default UserRegister;