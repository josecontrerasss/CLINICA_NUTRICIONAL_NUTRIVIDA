import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";
import Inicio from "./paginas/Inicio";
import Servicios from "./paginas/Servicios";
import DetalleServicio from "./paginas/DetalleServicio";
import Nosotros from "./paginas/Nosotros";
import Reserva from "./paginas/Reserva"; 

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;