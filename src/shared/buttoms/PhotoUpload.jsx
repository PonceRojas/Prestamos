//Este componente gestionará la carga y visualización de fotos.
import { Button, Grid, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const PhotoUpload = ({ fotos, handleFileChange, handleRemovePhoto }) => {
  return (
    <>
      <Button variant="outlined" component="label" sx={{ mt: 2, border: '1px dashed grey' }}>
        Subir Fotos
        <input type="file" accept="image/*" hidden multiple onChange={handleFileChange} />
      </Button>
      <Grid container spacing={1} mt={1}>
        {fotos.map((url, idx) => (
          <Grid item key={uuidv4()}>
            <div style={{ position: "relative" }}>
              <img src={url} alt={`Foto ${idx}`} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 4 }} />
              <IconButton
                size="small"
                sx={{ position: "absolute", top: -8, right: -8, background: "white" }}
                onClick={() => handleRemovePhoto(url)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PhotoUpload;