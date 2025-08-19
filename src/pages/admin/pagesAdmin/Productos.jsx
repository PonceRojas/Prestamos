import React from 'react';
import { Typography, Paper, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import BotonCompra from '../components/BotonCompra';

const productos = [
  {
    id: 'p1',
    nombre: "Camiseta de Algodón",
    descripcion: "Una camiseta cómoda y suave para el día a día.",
    imagen: "/imagen1.jpg",
    precio: 19.99,
    stock: 5,
  },
  {
    id: 'p2',
    nombre: "Pantalón Vaquero",
    descripcion: "Vaqueros duraderos y con estilo para cualquier ocasión.",
    imagen: "/imagen2.jpg",
    precio: 49.99,
    stock: 0,
  },
  {
    id: 'p3',
    nombre: "Zapatillas Deportivas",
    descripcion: "Ideales para correr o para un look casual y moderno.",
    imagen: "/imagen3.jpg",
    precio: 79.99,
    stock: 12,
  },
  {
    id: 'p4',
    nombre: "Chaqueta Impermeable",
    descripcion: "Protección contra la lluvia con un diseño ligero.",
    imagen: "/imagen4.jpg",
    precio: 89.99,
    stock: 8,
  },
  {
    id: 'p5',
    nombre: "Mochila Urbana",
    descripcion: "Espaciosa y con estilo, perfecta para la ciudad.",
    imagen: "/imagen5.jpg",
    precio: 35.00,
    stock: 15,
  },
  {
    id: 'p6',
    nombre: "Gorra de Béisbol",
    descripcion: "Clásica gorra con ajuste cómodo y diseño atemporal.",
    imagen: "https://images.unsplash.com/photo-1689308271305-58e75832289b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    precio: 15.50,
    stock: 20,
  },
  {
    id: 'p7',
    nombre: "Reloj Inteligente",
    descripcion: "Monitoriza tu actividad y recibe notificaciones.",
    imagen: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp",
    precio: 120.00,
    stock: 3,
  },
  {
    id: 'p8',
    nombre: "Auriculares Inalámbricos",
    descripcion: "Sonido de alta calidad y libertad sin cables.",
    imagen: "/imagen8.jpg",
    precio: 65.00,
    stock: 7,
  },
  {
    id: 'p9',
    nombre: "Libro: El Gran Viaje",
    descripcion: "Una novela de aventuras que te cautivará.",
    imagen: "/imagen9.jpg",
    precio: 12.99,
    stock: 25,
  },
];

const Productos = () => {
  const handleAddToCart = (event, product) => {
    if (product.stock === 0) {
      console.log(`Intento de añadir producto agotado: ${product.nombre}`);
      return;
    }
    console.log(`Añadiendo al carrito:`, product);
    alert(`"${product.nombre}" ha sido añadido al carrito por $${product.precio.toFixed(2)}.`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Nuestros Productos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Explora nuestra selección de productos de alta calidad.
      </Typography>
      <Grid container spacing={3}>
        {productos.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="180"
                image={prod.imagen}
                alt={prod.nombre}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3">{prod.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.descripcion}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${prod.precio.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <BotonCompra
                  product={prod}
                  onClick={handleAddToCart}
                  variant="contained"
                  // Puedes usar 'color' para los colores predefinidos de MUI (primary, secondary, error)
                  // o 'buttonColor' para colores personalizados.
                  // Aquí un ejemplo:
                  color={prod.stock === 0 ? 'error' : 'primary'} // Usa el color 'error' de MUI para agotados
                  // O puedes definir un color personalizado directamente:
                  // buttonColor={prod.stock === 0 ? '#D32F2F' : '#4CAF50'} // Rojo para agotado, Verde para disponible
                  size="medium"
                  disabled={prod.stock === 0}
                >
                  {prod.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </BotonCompra>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Productos;