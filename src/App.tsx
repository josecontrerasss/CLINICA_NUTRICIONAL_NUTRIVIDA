import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";
import Inicio from "./paginas/Inicio";
import Servicios from "./paginas/Servicios";
import DetalleServicio from "./paginas/DetalleServicio";
import Nosotros from "./paginas/Nosotros";
import Reserva from "./paginas/Reserva";
import Novedades from "./paginas/Novedades";
import DetalleNovedad from "./paginas/DetalleNovedad";
import Contacto from "./paginas/Contacto";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import AdminServicios from "./paginas/AdminServicios";
import AdminUsuarios from "./paginas/AdminUsuarios";
import AdminContactos from "./paginas/AdminContactos";
import Pago from "./paginas/Pago";
import RutaProtegida from "./componentes/RutaProtegida";
import AdminMedicos from "./paginas/AdminMedicos";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Routes>
          <Route path="/" element={<><Navbar /><Inicio /><Footer /></>} />
          <Route path="/nosotros" element={<><Navbar /><Nosotros /><Footer /></>} />
          <Route path="/servicios" element={<><Navbar /><Servicios /><Footer /></>} />
          <Route path="/servicio/:id" element={<><Navbar /><DetalleServicio /><Footer /></>} />
          <Route path="/reserva" element={<><Navbar /><Reserva /><Footer /></>} />
          <Route path="/novedades" element={<><Navbar /><Novedades /><Footer /></>} />
          <Route path="/novedad/:id" element={<><Navbar /><DetalleNovedad /><Footer /></>} />
          <Route path="/contacto" element={<><Navbar /><Contacto /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/registro" element={<><Navbar /><Registro /><Footer /></>} />
          <Route path="/pago" element={<><Navbar /><Pago /><Footer /></>} />

          <Route
              path="/admin"
              element={
                  <RutaProtegida rolRequerido="ADMINISTRADOR">
                      <AdminServicios />
                  </RutaProtegida>
              }
          />
          <Route
              path="/admin-usuarios"
              element={
                  <RutaProtegida rolRequerido="ADMINISTRADOR">
                      <AdminUsuarios />
                  </RutaProtegida>
              }
          />
          <Route
              path="/admin-contactos"
              element={
                  <RutaProtegida rolRequerido="ADMINISTRADOR">
                      <AdminContactos />
                  </RutaProtegida>
              }
          />
          <Route
             path="/admin-medicos"
             element={
                  <RutaProtegida rolRequerido="ADMINISTRADOR">
                      <AdminMedicos />
                  </RutaProtegida>
              }
/>
      </Routes>
    </div>
  );
}

export default App;