//* SELECTORES:
const formL = document.querySelector('#form-login');
const inputL = document.querySelector('#login-input');
const notificacion = document.querySelector('.notification');

//* EVENTOS:

formL.addEventListener('submit', async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/meseros', {
        method: 'GET'
    });

    const meseros = await respuesta.json();

    const mesero = meseros.find(i=>i.nombre === inputL.value);

    //validar:
    if(!mesero){
        //si no existe
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        }, 2500);
    }else{
        //si existe, debe tomar el valor y guardarlo en el localstorage
        localStorage.setItem('user', JSON.stringify(mesero))
        window.location.href = '/views/pedidos/index.html';
    }

    if(inputL.value === 'Cori'){
        localStorage.setItem('user', JSON.stringify(mesero))
        window.location.href = '/views/adminPa/index.html';
    }
})