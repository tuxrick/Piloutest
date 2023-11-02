import React, { useState, useEffect } from 'react';
import {Container, Paper, Typography } from '@mui/material';
import Navbar from '../General/Navbar';
import { useParams } from 'react-router-dom';
import {getUserInfo} from '../../Services/ServiceList';
import QRCode from 'qrcode.react';

function UserInfo() {
  const { id } = useParams();
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setUserInfo();
  },[]);

  async function setUserInfo() {
    setLoading(true);
    const user_info = await getUserInfo(id);
    setUserData(user_info.data);
    setLoading(false);
  }

  return (
    <>
      <Navbar/>
      <Container>
        {userData &&        
        <Paper elevation={3} style={{ padding: '20px', marginTop:"20px" }}>
          <Typography>Información de usuario</Typography>
          <br/>
          <Typography color="textSecondary">ID: {userData.data.id}</Typography>
          <Typography color="textSecondary">Nombre: {userData.data.name}</Typography>
          <Typography color="textSecondary">Apellidos: {userData.data.last_name}</Typography>
          <Typography color="textSecondary">email: {userData.data.email}</Typography>
          <Typography color="textSecondary">Contacto de emergencia: {userData.data.emergency_contact_name}</Typography>
          <Typography color="textSecondary">Teléfono de contacto de emergencia: {userData.data.emergency_contact_phone}</Typography>
          <Typography color="textSecondary">Tipo de Sangre: {userData.data.blood_type}</Typography>
          <br/>
          <QRCode value={id} />
        </Paper>
        }
      </Container>
    </>
  );
}

export default UserInfo;