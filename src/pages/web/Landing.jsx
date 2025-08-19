import React, { useState, useEffect } from "react";
import { Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import FullScreenBackground from "./componentes/FullScreenBackground.jsx";

// Animación de entrada del contenido
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Lista de imágenes del slider (constante fuera del componente)
const images = [
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80",
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true); // controla fade in/out

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // inicia fade out
      setTimeout(() => {
        // cambia imagen
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFade(true); // inicia fade in
      }, 1000); // duración del fade out
    }, 8000); // cambia cada 8s

    return () => clearInterval(interval);
  }, []);

  return (
    <FullScreenBackground
      backgroundImage={images[currentImageIndex]}
      overlayColor="rgba(0,0,0,0.55)"
      sx={{
        transition: "opacity 1s ease-in-out",
        opacity: fade ? 1 : 0,
      }}
    >
      <div
        style={{
          animation: `${fadeIn} 1s ease-out`,
          color: "#fff",
          textAlign: "center",
          width: "100%",
          maxWidth: "800px",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          Bienvenido a Mi Aplicación
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          Una plataforma moderna, rápida y segura para gestionar todo en un solo lugar.
        </Typography>

        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1259a7", transform: "scale(1.05)" },
            }}
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>

          {/*<Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              borderColor: "#fff",
              color: "#fff",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", transform: "scale(1.05)" },
            }}
            onClick={() => navigate("/admin")}
          >
            Ir al Panel
          </Button> */}
          
        </Stack>
      </div>
    </FullScreenBackground>
  );
};

export default Landing;
