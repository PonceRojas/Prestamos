import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ModalDark = ({ open, onClose, title, children, maxWidth = "sm" }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth={maxWidth}
    PaperProps={{
      sx: {
        backgroundColor: "#1e1e2f",
        color: "#fff",
        borderRadius: 3,
        padding: 2,
        boxShadow: "0 0 30px rgba(0,0,0,0.8)",
      },
    }}
  >
    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {title}
      <IconButton onClick={onClose} sx={{ color: "#fff" }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent sx={{ mt: 1 }}>{children}</DialogContent>
  </Dialog>
);

export default ModalDark;
