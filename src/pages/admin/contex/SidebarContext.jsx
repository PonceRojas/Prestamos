import { createContext, useContext, useState } from "react";

// Creamos el contexto
const SidebarContext = createContext();

// Hook para usar el contexto fácilmente
export const useSidebar = () => useContext(SidebarContext);

// Proveedor del contexto
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
