// src/components/ui/ModalLight.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";

const ModalLight = ({ open, onClose, title, children, maxWidth = "sm" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: 3,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        {title}
      </DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalLight;
