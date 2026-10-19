import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";
import Inicio from "./paginas/Inicio";
import Servicios from "./paginas/Servicios";
import DetalleServicio from "./paginas/DetalleServicio";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicio/:id" element={<DetalleServicio />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;