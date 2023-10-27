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
const openModal = document.querySelector('#open-modal');
const closeModal = document.querySelector('#close-modal');
const formC = document.querySelector('#form-create');
const inputC = document.querySelector('#create-input');
const modal = document.querySelector('#modal');
const notificacion = document.querySelector('.notification');

//*EVENTOS:
document.addEventListener('DOMContentLoaded', mostrarProductos);
listado.addEventListener('click', confirmarEliminar);

cerrarBtn.addEventListener('click', async e=> {
    localStorage.removeItem('user');
    window.location.href = '../home/index.html';
})

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

formC.addEventListener('click', async e=>{
    e.preventDefault();
    console.log('click')
    const respuesta = await fetch('http://localhost:3000/meseros', {
        method:'GET'
    });

    const meseros = await respuesta.json();

    //buscar si ya existe un usuario con el mismo nombre:
    const mesero = meseros.find(i=>i.nombre === inputC.value);
    ////console.log(user)

    //validaciones:
    if(!inputC.value){
        //el campo esta vacio
        console.log('El usuario no puede estar vacio')
        notificacion.innerHTML = 'El usuario no puede estar vacio';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');//<--esta clase le hace display a la notificacion
        },2500);
    }else if(mesero){
        //ya existe el usuario
        ////console.log('ya existe')
        notificacion.innerHTML = 'El usuario ya existe';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);
    }else{
        //Crear el usuario
        ////console.log('creando nuevo usuario')
        await fetch('http://localhost:3000/meseros', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({nombre:inputC.value})
        })


        notificacion.innerHTML = `El empleado ${inputC.value} ha sido creado`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);

        inputC.value = '';
        
        setTimeout(()=>{
            modal.close();
        },5000);
    }
});

//*FUNCIONES:

async function mostrarProductos() {
    const productos = await obtenerProductos();

    console.log(productos);

    const porCategorias = productos.sort((a,b)=>{
        return a.categoria - b.categoria;
    })

    ////console.log(porCategorias)

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