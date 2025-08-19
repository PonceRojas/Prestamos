import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animación de "pulso" del fondo
const backgroundPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FullScreenBackground = ({ backgroundImage, overlayColor, children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: `${backgroundPulse} 15s infinite ease-in-out`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: overlayColor || "rgba(0, 0, 0, 0.5)", // Capa oscura
          zIndex: 0,
        },
      }}
    >
      {/* Contenido encima del fondo */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
          px: 2,
          textAlign: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FullScreenBackground;
