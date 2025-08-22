// src/components/ui/ModalColorful.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ModalColorful = ({ open, onClose, title, children, maxWidth = "md", color = "#FF5722" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 5,
          border: `3px solid ${color}`,
          backgroundColor: "#fff8f0",
          boxShadow: `0 0 20px ${color}50`,
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: color,
          color: "#fff",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        {title}
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalColorful;
