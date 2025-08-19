// src/components/BotonCompra.jsx
import React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BotonCompra = ({
  children,
  onClick,
  product,
  variant = 'contained',
  color = 'primary', // Mantener esta prop si aún quieres usar los colores predefinidos de MUI
  buttonColor, // ¡Nueva prop para colores personalizados!
  icon: IconComponent,
  disabled = false,
  ...props
}) => {
  const handleClick = (event) => {
    if (!disabled && onClick) {
      console.log(`Comprando: ${product ? product.nombre : 'Artículo desconocido'}`);
      onClick(event, product);
    }
  };

  return (
    <Button
      variant={variant}
      color={color} // Material UI manejará los colores predefinidos (primary, error, etc.)
      onClick={handleClick}
      startIcon={IconComponent ? <IconComponent /> : <ShoppingCartIcon />}
      disabled={disabled}
      // Aplica el color personalizado si se proporciona
      sx={{
        backgroundColor: buttonColor, // Establece el color de fondo del botón
        '&:hover': {
          backgroundColor: buttonColor ? buttonColor : null, // Mantiene el color en hover o permite el por defecto de MUI
          opacity: buttonColor ? 0.9 : 1, // Puedes ajustar la opacidad en hover para el color personalizado
        },
        // Puedes agregar más estilos aquí si es necesario
      }}
      {...props}
    >
      {children || 'Comprar'}
    </Button>
  );
};

export default BotonCompra;