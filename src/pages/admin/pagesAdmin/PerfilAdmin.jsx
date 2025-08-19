import React, { useState } from "react";
import ProfileImageUploader from "../components/ProfileImageUploader";
import UserMenu from "../components/UserMenu";

const AdminProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState("/usuario.jpg");

  return (
    <div>
      <h2>Perfil Administrador</h2>
      <ProfileImageUploader
        userId="admin123"
        onUpload={(url) => setAvatarUrl(url)}
      />

      <h3>Vista previa Navbar:</h3>
      <UserMenu username="Administrador" avatar={avatarUrl} />
    </div>
  );
};

export default AdminProfile;



