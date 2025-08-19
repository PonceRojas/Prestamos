const validarCI = (ci) => /^[0-9]{6,10}$/.test(ci); // 6 a 10 dígitos
const validarCelular = (cel) => /^[67][0-9]{7}$/.test(cel); // Bolivia: empieza con 6 o 7 y 8 dígitos

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validarCI(ci)) {
    alert("CI inválido");
    return;
  }
  if (!validarCelular(celular)) {
    alert("Celular inválido");
    return;
  }
  // luego haces el fetch al backend
};
