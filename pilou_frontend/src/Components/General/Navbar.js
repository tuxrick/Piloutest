import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoginResponse } from '../../actions';

function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login_data = useSelector((state) => state.loginResponse);
  const [loginData, setloginData] = useState(false);

  useEffect(() => {
    if(login_data){
      setloginData(login_data);
    }else{
        setloginData(false);
    }
  }, []);

  function handleGoToStart() {
    navigate('/');
  }
  function handleLogout() {
    dispatch(setLoginResponse(null));
    navigate('/');
    window.location.reload();
  }
  function handleGoToProfile() {
    navigate('/user_info/'+loginData.data._id);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pilou Test
        </Typography>
        <Button color="inherit" onClick={handleGoToStart}>Inicio</Button>
        {
          loginData &&
          <Button color="inherit" onClick={handleGoToProfile}>Perfil</Button>
        }
        {
          loginData &&
          <Button color="inherit" onClick={handleLogout}>Salir</Button>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
