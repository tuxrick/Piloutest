import React, { useState, useEffect } from 'react';
import {Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {getUserList} from '../../Services/ServiceList';
import { useSelector } from 'react-redux';

function UserList() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserList();
  }, []);

  async function setUserList() {
    setLoading(true);
    const user_list = await getUserList({token: user_data.data.token});
    setData(user_list.data.data);
    setLoading(false);
  }

  const user_data = useSelector((state) => state.loginResponse);

  return (
    <Container>
      {!loading &&
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography>User List</Typography>      
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contacto de emergencia</TableCell>
                <TableCell>Número de contacto de emergencia</TableCell>
                <TableCell>Tipo de sangre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.emergency_contact_name}</TableCell>
                  <TableCell>{row.emergency_contact_phone}</TableCell>
                  <TableCell>{row.blood_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      }
    </Container>
  );
}

export default UserList;