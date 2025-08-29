import React, { useEffect, useMemo, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Componentes modulares
import PagosTable from "./components/PagosTable";
import PagoForm from "./components/PagoForm";
import PagoDetails from "./components/PagoDetails";

// Servicio Firestore (sin interés en UI; el backend capitaliza por meses completos)
import {
  fetchPrestamosActivos,
  fetchPagosPorPrestamo,
  registrarPago,
} from "./pagoService";

/* ==========================
   Helpers y constantes
   ========================== */
const FILTERS = {
  DEUDORES: "DEUDORES",
  POR_VENCER: "POR_VENCER_30",
  MOROSOS: "MOROSOS",
};

const HOY = () => new Date();

const parseYMD = (s) => {
  if (!s) return new Date(NaN);
  const [y, m, d] = String(s).split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const diffDays = (a, b) => Math.floor((b - a) / (1000 * 60 * 60 * 24));

function FiltersBar({ current, onChange }) {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
      <Chip
        label="Deudores"
        color={current === FILTERS.DEUDORES ? "primary" : "default"}
        onClick={() => onChange(FILTERS.DEUDORES)}
      />
      <Chip
        label="Por vencer (30 días)"
        color={current === FILTERS.POR_VENCER ? "primary" : "default"}
        onClick={() => onChange(FILTERS.POR_VENCER)}
      />
      <Chip
        label="Morosos"
        color={current === FILTERS.MOROSOS ? "primary" : "default"}
        onClick={() => onChange(FILTERS.MOROSOS)}
      />
    </Stack>
  );
}

/* ==========================
   Página principal
   ========================== */
export default function RealizarPago() {
  // Filtro por defecto: Deudores
  const [filter, setFilter] = useState(FILTERS.DEUDORES);

  const [loading, setLoading] = useState(false);
  const [prestamos, setPrestamos] = useState([]); // préstamos desde Firestore

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Diálogos
  const [formOpen, setFormOpen] = useState(false);
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [pagosPrestamo, setPagosPrestamo] = useState([]);

  // Cargar préstamos al montar
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPrestamosActivos();
        setPrestamos(data);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los préstamos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filas para la tabla: mostramos el saldo tal cual está en Firestore (ya capitalizado por backend cuando corresponde)
  const rows = useMemo(() => {
    const hoy = HOY();
    const s = search.trim().toLowerCase();

    let base = prestamos.map((p) => {
      // Fecha límite = fecha préstamo + 30 días
      const fPrest = parseYMD(p.fecha);
      const fLim = isNaN(fPrest) ? new Date(NaN) : addDays(fPrest, 30);
      const dias = isNaN(fPrest) ? 9999 : diffDays(hoy, fLim);

      const saldo = typeof p.saldo === "number" ? Number(p.saldo) : Number(p.monto) || 0;

      return {
        ...p,
        carnet: p.carnet || "",
        saldo,
        fechaLimite: isNaN(fLim) ? "—" : fLim.toISOString().slice(0, 10),
        diasAVencer: isNaN(dias) ? "—" : dias,
      };
    });

    // Buscador por cliente, estado, carnet
    if (s) {
      base = base.filter((p) =>
        [p.cliente, p.estado, p.carnet]
          .filter(Boolean)
          .some((x) => String(x).toLowerCase().includes(s))
      );
    }

    const esPagado = (p) => p.estado === "Pagado" || Number(p.saldo) <= 0;

    // Filtros
    if (filter === FILTERS.DEUDORES) {
      base = base.filter((p) => !esPagado(p));
      base.sort((a, b) => Number(a.diasAVencer) - Number(b.diasAVencer));
    } else if (filter === FILTERS.POR_VENCER) {
      base = base.filter(
        (p) =>
          !esPagado(p) &&
          Number(p.diasAVencer) >= 0 &&
          Number(p.diasAVencer) <= 30
      );
      base.sort((a, b) => Number(a.diasAVencer) - Number(b.diasAVencer));
    } else if (filter === FILTERS.MOROSOS) {
      base = base.filter((p) => !esPagado(p) && Number(p.diasAVencer) < 0);
      base.sort((a, b) => Number(a.diasAVencer) - Number(b.diasAVencer)); // más negativos primero
    }

    return base;
  }, [prestamos, search, filter]);

  /* ====== Acciones ====== */
  const abrirRegistrarPago = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setFormOpen(true);
  };

  // Verifica que este bloque esté bien:
  const abrirDetalles = async (prestamo) => {
    try {
      // 1. Consulta los pagos
      const pagos = await fetchPagosPorPrestamo(prestamo.id);
      console.log("Pagos cargados:", pagos);

      // 2. Combina el objeto del préstamo con el array de pagos
      const prestamoConPagos = {
        ...prestamo,
        pagos: pagos,
      };

      // 3. Guarda el objeto combinado en el estado
      setPrestamoSeleccionado(prestamoConPagos);

      // 4. Abre el modal
      setDetalleOpen(true);

    } catch (e) {
      console.error(e);
      setError("No se pudo cargar el historial de pagos.");
    }
  };

  const guardarPago = async (form) => {
    try {
      const { prestamoId, cliente, monto, fecha, metodo, referencia, notas } =
        form;

      // Backend capitaliza por meses completos si corresponde y descuenta
      const { prestamoActualizado } = await registrarPago({
        prestamoId,
        cliente,
        monto: Number(monto),
        fecha,
        metodo,
        referencia,
        notas,
      });

      // Actualizar en memoria el préstamo (incluye ultimaCapitalizacion devuelta por el backend)
      setPrestamos((prev) =>
        prev.map((p) =>
          p.id === prestamoId
            ? {
                ...p,
                saldo: prestamoActualizado.saldo,
                estado: prestamoActualizado.estado,
                ultimaCapitalizacion:
                  prestamoActualizado.ultimaCapitalizacion ?? p.ultimaCapitalizacion,
              }
            : p
        )
      );

      // Si el detalle está abierto del mismo préstamo, refrescar historial
      if (
        detalleOpen &&
        prestamoSeleccionado &&
        prestamoSeleccionado.id === prestamoId
      ) {
        const pagosRefrescados = await fetchPagosPorPrestamo(prestamoId);
        setPagosPrestamo(pagosRefrescados);
      }

      setFormOpen(false);
      setPrestamoSeleccionado(null);
    } catch (e) {
      console.error(e);
      setError(e.message || "No se pudo registrar el pago.");
    }
  };

  /* ====== UI ====== */
  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, borderRadius: "12px" }}>
      <Grid container spacing={3} alignItems="center" mb={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Pagos / Cobranzas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Deudores por defecto, por vencer (30 días) y morosos. Registra pagos
            y revisa historiales.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Buscar por cliente, estado o carnet"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", md: 360 } }}
          />
        </Grid>
      </Grid>

      <FiltersBar current={filter} onChange={setFilter} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <PagosTable
        rows={rows}
        loading={loading}
        onView={abrirDetalles}
        onRegistrar={abrirRegistrarPago}
      />

      {/* Registrar Pago */}
      <PagoForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setPrestamoSeleccionado(null);
        }}
        onSave={guardarPago}
        prestamo={prestamoSeleccionado}
      />

      {/* Detalles del préstamo + historial */}
      <PagoDetails
        open={detalleOpen}
        onClose={() => setDetalleOpen(false)}
        prestamo={prestamoSeleccionado}
        pagos={pagosPrestamo}
      />
    </Paper>
  );
}
