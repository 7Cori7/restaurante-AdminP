import { obtenerProductos, eliminarProducto } from "./api.js"; 

const admin = JSON.parse(localStorage.getItem('user'));
console.log(admin)

//Validar la ruta:
if(!admin){
    //caso de que el usuario no este en el localsotrage(no inicio sesion)
    window.location.href = '../home/index.html';
}

//*SELECTORES
const listado = document.querySelector('#listado-Productos');
const cerrarBtn = document.querySelector('#cerrar-btn');

//*EVENTOS:
document.addEventListener('DOMContentLoaded', mostrarProductos);
listado.addEventListener('click', confirmarEliminar);

cerrarBtn.addEventListener('click', async e=> {
    localStorage.removeItem('user');
    window.location.href = '../home/index.html';
})

async function mostrarProductos() {
    const productos = await obtenerProductos();

    console.log(productos);

    const porCategorias = productos.sort((a,b)=>{
        return a.categoria - b.categoria;
    })

    console.log(porCategorias)

    porCategorias.forEach(i => {
        const {nombre, precio, categoria, id} = i;
        const row = document.createElement('tr');

        row.innerHTML += ` <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${nombre}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">$${precio}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${categoria}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <a href="editar-producto.html?id=${id}" class="text-teal-600 mr-5 hover:text-teal-900">Editar</a>
         <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        `

    listado.appendChild(row)
    });
}

async function confirmarEliminar(e) {
    if(e.target.classList.contains('eliminar')){
        const productoId = parseInt(e.target.dataset.producto);
        console.log(productoId);

       const confirmar = confirm('Quieres eliminar este producto');

       if (confirmar) {
            await eliminarProducto(productoId)
       }
    }
}