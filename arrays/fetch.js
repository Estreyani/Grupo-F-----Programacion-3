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
        console.log(datos);

        // Guardar datos (Ejercicio 1d)
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

        // Manejo seguro por si la API no devuelve JSON
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

////////////////////// PRUEBAS //////////////////////

// Traer todos (y guardar JSON)
personajes();

// Crear uno nuevo
NuevoPersonaje();

// Buscar por ID
buscarPersonaje(12); 





