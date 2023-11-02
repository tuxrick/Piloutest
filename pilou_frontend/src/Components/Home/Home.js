import React, { useState, useEffect } from 'react';
import {Container, Paper, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QrReader } from 'react-qr-reader';
import Navbar from '../General/Navbar';


function Home() {
  const navigate = useNavigate();
  const login_data = useSelector((state) => state.loginResponse);

  const [loginData, setloginData] = useState(false);

  useEffect(() => {
    if(login_data){
      setloginData(login_data);
    }else{
        setloginData(false);
    }
  }, []);


  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  function handleLogin() {
    navigate('/login');
  }

  function handleUserList() {
    navigate('/user_list');
  }

  function handleUserRegister(){
    navigate('/user_register');
  }

  async function handleScan(data) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setScanning(true);
        const qrReader = new window.QrReader();
        qrReader.init(stream, null, (error) => {
          if (error) {
            console.error(error);
          }
        });
        qrReader.scan((result) => {
          if (result) {
            setScanResult(result);
            alert(result);
            qrReader.stop();
            stream.getTracks().forEach((track) => track.stop());
          }
        });
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <>
    <Navbar/>
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop:"20px" }}>
        { loginData &&
            <Typography variant="h4" gutterBottom>
                Bienvenido { !loginData ? "" : loginData.data.name}
            </Typography>
        }
        <Grid container spacing={3}>
        <Grid item xs={3}>
            {scanning ? (
                <QrReader
                delay={500}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
            ) : (
                <Button
                variant="contained"
                color="primary"
                onClick={() => setScanning(true)}
                >
                Iniciar Escaneo
                </Button>
            )}
            {scanning && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                    setScanning(false);
                    setScanResult(null);
                    }}
                >
                    Detener Escaneo
                </Button>
            )}

            </Grid>
            { !loginData &&
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Iniciar Sesión
                    </Button>
                </Grid>
            }
            { loginData &&
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleUserList}>
                        Ver lista de usuarios
                    </Button>
                </Grid>
            }
            <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={handleUserRegister}>
                    Registrar Usuario
                </Button>
            </Grid>
        </Grid>
      </Paper>
      {scanResult && <p>Resultado del escaneo: {scanResult}</p>}
    </Container>
    </>
  );
}

export default Home;
