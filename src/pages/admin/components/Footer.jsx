import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      background: "linear-gradient(90deg, #1e3c72 60%, #2a5298 100%)",
      color: "#fff",
      py: { xs: 2, sm: 2 },
      px: { xs: 1, sm: 4 },
      boxShadow: "0 -2px 8px rgba(30,60,114,0.15)",
      position: "relative",
      left: 0,
      bottom: 0,
      mt: "auto",
      overflow: "hidden",
    }}
  >
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          letterSpacing: 1,
          textAlign: { xs: "center", sm: "left" },
          flex: 1,
          mb: { xs: 1, sm: 0 },
          minWidth: 0,
        }}
      >
        &copy; {new Date().getFullYear()} Panel Admin. Todos los derechos reservados.
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-end" },
          width: { xs: "100%", sm: "auto" },
          minWidth: 0,
        }}
      >
        <Button
          color="inherit"
          sx={{
            bgcolor: "#2a5298",
            color: "#fff",
            borderRadius: 2,
            px: 2,
            fontWeight: 500,
            fontSize: { xs: "0.8rem", sm: "1rem" },
            textTransform: "none",
            boxShadow: 1,
            "&:hover": { bgcolor: "#1e3c72" },
            width: { xs: "100%", sm: "auto" },
            minWidth: 0,
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          href="https://chaskydev.com/servicios"
          target="_blank"
        >
          Sitio Web
        </Button>
        <Button
          color="inherit"
          sx={{
            bgcolor: "#2a5298",
            color: "#fff",
            borderRadius: 2,
            px: 2,
            fontWeight: 500,
            fontSize: { xs: "0.8rem", sm: "1rem" },
            textTransform: "none",
            boxShadow: 1,
            "&:hover": { bgcolor: "#1e3c72" },
            width: { xs: "100%", sm: "auto" },
            minWidth: 0,
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          href="mailto:soporte@tumarca.com"
        >
          Soporte
        </Button>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;