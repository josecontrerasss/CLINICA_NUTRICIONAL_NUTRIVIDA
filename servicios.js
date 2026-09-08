let servicios = [
    {
        id: 1,
        nombre: "Nutrición Deportiva",
        precio: 25000,
        descripcion: "Plan a tu medida para mejorar tu rendimiento físico.",
        imagen: "imagenes/Servicios/deporte.jpg"
    },
    {
        id: 2,
        nombre: "Control de Peso",
        precio: 20000,
        descripcion: "Logra tu peso ideal de forma saludable y sostenible.",
        imagen: "imagenes/Servicios/peso.jpg"
    },
    {
        id: 3,
        nombre: "Dieta Vegana",
        precio: 22000,
        descripcion: "Transición segura con todos los nutrientes necesarios.",
        imagen: "imagenes/Servicios/vegana.jpg"
    }
];

let lista = document.getElementById("listaServicios");

for(let i = 0; i < servicios.length; i++){
    lista.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; max-width: 400px;">
            <img src="${servicios[i].imagen}" width="200">
            <h2>${servicios[i].nombre}</h2>
            <p>Precio: ${servicios[i].precio}</p>
            <button onclick="verDetalle(${servicios[i].id})">Ver detalle</button>
        </div>
    `;
}

function verDetalle(id){
    let servicioSeleccionado;

    for(let i = 0; i < servicios.length; i++){
        if(servicios[i].id === id){
            servicioSeleccionado = servicios[i];
        }
    }

    
    localStorage.setItem("servicioDetalle", JSON.stringify(servicioSeleccionado));
    
    window.location.href = "detalle.html";
}