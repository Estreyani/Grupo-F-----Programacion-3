////////////////// Ejercicio 1a ///////////////////////////

const url = 'https://thronesapi.com/api/v2/Characters';

////////////////// Ejercicio 1d ///////////////////////////

const fs = require('fs');
const path = require('path');

const rutaPersonajes = path.join(__dirname, 'personajes.json');

function guardarDatos(data) {
    fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Datos guardados correctamente en personajes.json');
}

async function personajes() {
    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            console.log('error');
            return;
        }

        const datos = await resp.json();

        guardarDatos(datos);

    } catch (error) {
        console.log(`error -> ${error}`);
    }
}

////////////////////// Ejercicio 1b ////////////////////

async function NuevoPersonaje() {
    try {
        const agregar = {
            id: 0,
            firstName: "Nuevo",
            lastName: "Personaje",
            fullName: "Nuevo Personaje",
            title: "Agregado",
            family: "Los Nuevos",
            image: "x.jpg",
            imageUrl: "x.com",
        };

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agregar)
        });

        console.log("Estado de la respuesta (Status):", resp.status);


        if (!resp.ok) {
            console.log('Error. Por favor verifique los datos');
            return;
        }

        const texto = await resp.text();

        if (texto) {
            const datos = JSON.parse(texto);
            console.log('Personaje agregado con exito:', datos);
        } else {
            console.log('Personaje agregado (sin respuesta en body)');
        }

    } catch (error) {
        console.log(`error -> ${error}`);
    }
}

/////////////////// Ejercicio 1c ////////////////////

async function buscarPersonaje(id) {
    try {
        const respuesta = await fetch(`${url}/${id}`);

        if (!respuesta.ok) {
            console.log('Personaje no encontrado');
            return;
        }

        const personaje = await respuesta.json();
        console.log("Personaje: ", personaje);

    } catch (error) {
        console.log(`Error en busqueda, Por favor intentelo nuevamente -> ${error}`);
    }
}

/////////////////// Ejercicio 2a ////////////////////

async function agregarAlFinal() {
    try {
        const data = JSON.parse(fs.readFileSync(rutaPersonajes, 'utf-8'));

        console.log("Antes:", data.length);
        const nuevo = {
            id: 99,
            firstName: "Final",
            lastName: "Personaje",
            fullName: "Final Personaje",
            title: "Agregado",
            family: "Custom",
            image: "",
            imageUrl: ""
        };

        data.push(nuevo);
        console.log("Después:", data.length);

        fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');
        console.log('✔ Personaje agregado al final');

    } catch (error) {
        console.log(`Error -> ${error}`);
    }
}

/////////////////// Ejercicio 2b ////////////////////

async function agregarDosAlInicio() {
    try {
        const data = JSON.parse(fs.readFileSync(rutaPersonajes, 'utf-8'));

        console.log("Antes:", data.length);

        const nuevo1 = {
            id: 200,
            firstName: "Primero",
            lastName: "Inicio",
            fullName: "Primero Inicio",
            title: "Agregado",
            family: "Custom",
            image: "",
            imageUrl: ""
        };

        const nuevo2 = {
            id: 201,
            firstName: "Segundo",
            lastName: "Inicio",
            fullName: "Segundo Inicio",
            title: "Agregado",
            family: "Custom",
            image: "",
            imageUrl: ""
        };

        data.unshift(nuevo1, nuevo2);

        console.log("Después:", data.length);
        fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');

        console.log('✔ Dos personajes agregados al inicio');

    } catch (error) {
        console.log(`Error -> ${error}`);
    }
}

/////////////////// Ejercicio 2c ////////////////////

async function eliminarPersonaje() {
    try {
        const data = JSON.parse(fs.readFileSync(rutaPersonajes, 'utf-8'));

        const eliminado= data[0]; 
        console.log('Eliminando primer personaje:', eliminado);
        data.splice(0, 1);
        console.log("Personaje eliminado con exito");

    fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');

    } catch (error) {
        console.log(`Error -> ${error}`);
    }
}

// Traer todos (y guardar JSON)
personajes();

// Crear uno nuevo
NuevoPersonaje();

// Buscar por ID
buscarPersonaje(12); 

// Agregar al final del JSON
agregarAlFinal();

// Agregar dos personajes al inicio
agregarDosAlInicio();

// Eliminar
eliminarPersonaje();






