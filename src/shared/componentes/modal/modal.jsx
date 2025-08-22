// src/components/ui/ModalReutilizable.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const ModalReutilizable = ({ open, onClose, title, children, maxWidth = "md" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: '0 0 20px 5px rgba(0, 150, 255, 0.5)',
          border: '2px solid #0096FF',
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          fontWeight: "bold"
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3, p: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalReutilizable;
