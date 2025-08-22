import React, { useState, useEffect } from "react";
import ModalReutilizable from "../../../../../shared/componentes/modal/modal";
import FormFields from "../../../../../components/FormFields";
import PhotoUpload from "../../../../../components/PhotoUpload";
import ActionButtons from "../../../../../components/ActionButtons";

const PrestamoForm = ({ open, onClose, onSave, prestamo }) => {
  const [form, setForm] = useState({
    cliente: "",
    monto: "",
    fecha: "",
    celular: "",
    carnet: "",
    contactoFamiliar: "",
    detalles: "",
    fotos: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prestamo) {
      setForm({
        cliente: prestamo.cliente || "",
        monto: prestamo.monto || "",
        fecha: prestamo.fecha || "",
        celular: prestamo.celular || "",
        carnet: prestamo.carnet || "",
        contactoFamiliar: prestamo.contactoFamiliar || "",
        detalles: prestamo.detalles || "",
        fotos: prestamo.fotos || [],
      });
    } else {
      setForm({
        cliente: "",
        monto: "",
        fecha: "",
        celular: "",
        carnet: "",
        contactoFamiliar: "",
        detalles: "",
        fotos: [],
      });
    }
    setErrors({});
  }, [prestamo, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((f) => URL.createObjectURL(f));
    setForm({ ...form, fotos: [...form.fotos, ...fileUrls] });
  };

  const handleRemovePhoto = (url) => {
    setForm({ ...form, fotos: form.fotos.filter((f) => f !== url) });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.cliente) newErrors.cliente = "El nombre del cliente es requerido.";
    if (!form.monto || form.monto <= 0) newErrors.monto = "El monto debe ser un número positivo.";
    if (!form.fecha) newErrors.fecha = "La fecha es requerida.";
    if (!form.celular) newErrors.celular = "El número de celular es requerido.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
      setErrors({});
    }
  };

  return (
    <ModalReutilizable
      open={open}
      onClose={onClose}
      title={prestamo ? "Editar Préstamo" : "Nuevo Préstamo"}
    >
      <FormFields form={form} handleChange={handleChange} errors={errors} />
      <PhotoUpload fotos={form.fotos} handleFileChange={handleFileChange} handleRemovePhoto={handleRemovePhoto} />
      <ActionButtons onClose={onClose} onSave={handleSave} />
    </ModalReutilizable>
  );
};

export default PrestamoForm;
