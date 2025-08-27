//Este componente solo contendrá los botones de "Cancelar" y "Guardar".
import React from "react";
import { Button, DialogActions } from "@mui/material";

const ActionButtons = ({ onClose, onSave }) => {
  return (
    <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
      <Button onClick={onClose} variant="outlined">Cancelar</Button>
      <Button variant="contained" onClick={onSave}>Guardar</Button>
    </DialogActions>
  );
};

export default ActionButtons;