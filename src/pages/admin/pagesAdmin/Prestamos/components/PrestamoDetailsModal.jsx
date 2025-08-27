import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  MobileStepper,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const PrestamoDetailsModal = ({ open, onClose, prestamo }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!prestamo) return null;

  const fotos = prestamo.fotos || [];
  const maxSteps = fotos.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  // Cálculos de interés del mes (sobre saldo si existe; si no, sobre monto)
  const saldoBase =
    typeof prestamo.saldo === "number"
      ? Number(prestamo.saldo)
      : Number(prestamo.monto) || 0;
  const interesPct = Number(prestamo.interes) || 0;
  const interesMesBs = Number((saldoBase * (interesPct / 100)).toFixed(2));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "16px", p: 2 } }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        📄 Detalles del Préstamo
      </DialogTitle>

      <DialogContent dividers>
        {/* Carrusel de fotos */}
        {maxSteps > 0 && (
          <Box sx={{ maxWidth: 400, flexGrow: 1, margin: "auto", mb: 2 }}>
            <Box
              component="img"
              sx={{
                height: 255,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                width: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
              src={fotos[activeStep]}
              alt={`Foto ${activeStep + 1}`}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={maxSteps === 1}
                >
                  Siguiente
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={maxSteps === 1}
                >
                  <KeyboardArrowLeft />
                  Anterior
                </Button>
              }
            />
          </Box>
        )}

        {/* Información general */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Cliente:</strong> {prestamo.cliente}
            </Typography>
            <Typography>
              <strong>Carnet:</strong> {prestamo.carnet}
            </Typography>
            <Typography>
              <strong>Celular:</strong> {prestamo.celular}
            </Typography>
            <Typography>
              <strong>Contacto familiar:</strong>{" "}
              {prestamo.contactoFamiliar || "—"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Monto:</strong> {prestamo.monto}
            </Typography>
            <Typography>
              <strong>Fecha:</strong> {prestamo.fecha}
            </Typography>
            <Typography>
              <strong>Estado:</strong> {prestamo.estado || "Pendiente"}
            </Typography>
            <Typography>
              <strong>Interés mensual:</strong> {interesPct}%
            </Typography>
            <Typography>
              <strong>Interés del mes (Bs):</strong> {interesMesBs}
            </Typography>
            {typeof prestamo.saldo === "number" && (
              <Typography>
                <strong>Saldo actual (sin capitalizar aquí):</strong>{" "}
                {prestamo.saldo}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Sección de detalles */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Detalles del Préstamo
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: "12px",
            backgroundColor: "grey.50",
            minHeight: 180,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          <Typography whiteSpace="pre-wrap">
            {prestamo.detalles || "Sin detalles adicionales."}
          </Typography>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrestamoDetailsModal;
