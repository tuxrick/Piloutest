import React, { useState, useEffect } from 'react';
import {Container, Paper, Typography, TextField, Button } from '@mui/material';
import {login} from '../../Services/ServiceList';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginResponse } from '../../actions';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(false);

  const dispatch = useDispatch();
  const login_data = useSelector((state) => state.loginResponse);

  useEffect(() => {
    if(login_data){
      navigate('/');
    }
  }, []);


  const handleLogin = async () => {

    setLoading(true);
    try {
      const login_data = await login({email: email, password: password});
      if(login_data.status === "success"){
        dispatch(setLoginResponse(login_data));
        setLoading(false);
        setErrorData(false);
        navigate('/home');
      }else{
        setLoading(false);
        setErrorData(true);
        dispatch(setLoginResponse(null));
      }
      console.log('Respuesta del servidor:', login_data);
    } catch (error) {
      setLoading(false);
      setErrorData(true);
      dispatch(setLoginResponse(null));
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Inicio de Sesión
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography>{errorData ? 'Datos incorrectos' : ''}</Typography>
        <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
