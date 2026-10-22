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

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicio/:id" element={<DetalleServicio />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/novedad/:id" element={<DetalleNovedad />} />
          <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;