//uso de la lireria @mui/material y @mui/icons-material para el diseño del panel de administración
import { Typography, Paper, Box } from "@mui/material";

const Dashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Bienvenido al Panel de Administración
    </Typography>
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="body1">
        Selecciona una opción del menú para comenzar.
      </Typography>
    </Paper>
  </Box>
);

export default Dashboard;
//instalar npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
