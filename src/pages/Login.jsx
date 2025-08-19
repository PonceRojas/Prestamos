import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import userService from '../db/services/userService'; // Selector de backend

// Animación borde
const borderAnimation = keyframes`
  0% {
    border-color: rgba(30, 60, 114, 0.5);
    box-shadow: 0 0 15px rgba(30, 60, 114, 0.5);
  }
  50% {
    border-color: rgba(42, 82, 152, 0.8);
    box-shadow: 0 0 30px rgba(42, 82, 152, 0.8);
  }
  100% {
    border-color: rgba(30, 60, 114, 0.5);
    box-shadow: 0 0 15px rgba(30, 60, 114, 0.5);
  }
`;

// Pulso de brillo
const backgroundPulse = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(1.05); }
  100% { filter: brightness(1); }
`;

// Movimiento gatito
const catMovement = keyframes`
  0% { transform: translateX(-100%) scaleX(-1); }
  25% { transform: translateX(10%) scaleX(-1); }
  49% { transform: translateX(calc(100vw - 100px - 10%)) scaleX(-1); }
  50% { transform: translateX(calc(100vw - 100px - 10%)) scaleX(1); }
  75% { transform: translateX(10%) scaleX(1); }
  100% { transform: translateX(-100%) scaleX(1); }
`;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login(username, password);
      if (user) {
        navigate('/admin');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,  //Apartado par aajustar el tamaño de la imagen para el fondo de pantalla del login
        left: 0,
        overflow: 'hidden',
        backgroundImage: 'url("https://elcomercio.pe/resizer/mMMnXspIbXl6uHtZiG1otTEbWds=/1500x836/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NFZ7N7B7YVEINGAJOXK3TLNFH4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: `${backgroundPulse} 15s infinite ease-in-out`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30, 60, 114, 0.6)',
          zIndex: 0,
        },
      }}
    >
      {/* Gatito animado */}
      <Box
        component="img"
        src="/Cat.gif"
        alt="Gatito animado"
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          width: 100,
          height: 'auto',
          zIndex: 2,
          display: { xs: 'none', sm: 'block' },
          animation: `${catMovement} 20s linear infinite`,
          transformOrigin: 'center center',
        }}
      />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 320,
          textAlign: 'center',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid transparent',
          animation: `${borderAnimation} 4s infinite ease-in-out`,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Panel Administrativo
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, background: '#1e3c72', '&:hover': { background: '#2a5298' } }}
          >
            Iniciar sesión
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;