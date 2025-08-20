import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const PrestamoSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Buscar préstamo"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ flexGrow: 1, maxWidth: 300 }}
    />
  );
};

export default PrestamoSearch;
