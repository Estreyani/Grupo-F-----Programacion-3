////////////////// Ejercicio 1a ///////////////////////////

const url = 'https://thronesapi.com/api/v2/Characters';

////////////////// Ejercicio 1d ///////////////////////////

const fs = require('fs');
const path = require('path');

const rutaPersonajes = path.join(__dirname, 'personajes.json');

function guardarDatos(data) {
    fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✔✔✔ Datos guardados correctamente en personajes.json');
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

        console.log(" ☑ Estado de la respuesta (Status):", resp.status);

        if (!resp.ok) {
            console.log('Error. Por favor verifique los datos');
            return;
        }

        const texto = await resp.text();

        if (texto) {
            const datos = JSON.parse(texto);
            console.log('Personaje agregado con exito:', datos);
        } else {
            console.log('☑ Personaje agregado (Confirmación recibida sin datos)');
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
        console.log("🔍︎ Personaje encontrado: ", personaje);

    } catch (error) {
        console.log(`Error en busqueda, Por favor intentelo nuevamente -> ${error}`);
    }
}

/////////////////// Ejercicio 2a ////////////////////

async function agregarAlFinal() {
    try {
        const data = JSON.parse(fs.readFileSync(rutaPersonajes, 'utf-8'));

        console.log("...Total personajes inicial:", data.length);

        const nuevo = {
            id: 99,
            firstName: "Duncan",
            lastName: "el Alto",
            fullName: "Duncan el Alto",
            title: "Caballero Errante",
            family: "Casa Targaryen (Leal)",
            image: "duncan.jpg",
            imageUrl: "https://thronesapi.com/assets/images/duncan.jpg"
        };

        data.push(nuevo);
        console.log("...Total personajes final:", data.length);

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

        console.log("...Total personajes inicial:", data.length);

        const nuevo1 = {
            id: 200,
            firstName: "Aegon",
            lastName: "Targaryen",
            fullName: "Aegon V (Egg)",
            title: "Escudero",
            family: "Casa Targaryen",
            image: "egg.jpg",
            imageUrl: "https://thronesapi.com/assets/images/egg.jpg"
        };

        const nuevo2 = {
            id: 201,
            firstName: "Baelor",
            lastName: "Targaryen",
            fullName:"Baelor Rompelanza",
            title: "Príncipe de Rocadragón",
            family: "Casa Targaryen",
            image: "baelor.jpg",
            imageUrl: "https://thronesapi.com/assets/images/baelor.jpg"
        };

        data.unshift(nuevo1, nuevo2);

        console.log("...Total personajes final:", data.length);
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

        const eliminado = data[0];
        console.log('🗑 Eliminando primer personaje:', eliminado);
        
        data.splice(0, 1);
        console.log("...Personaje eliminado con exito...");

        fs.writeFileSync(rutaPersonajes, JSON.stringify(data, null, 2), 'utf-8');

    } catch (error) {
        console.log(`Error -> ${error}`);
    }
}

/////////////////// Ejercicio 2d ////////////////////

async function personajesId() {
    try {
        const archivo = fs.readFileSync(rutaPersonajes, "utf-8");
        const personajes = JSON.parse(archivo);

        const nuevoArray = [];

        for (let i = 0; i < personajes.length; i++) {
            const personaje = personajes[i];

            nuevoArray.push({
                id: personaje.id,
                nombre: personaje.fullName
            });
        }

        const rutaIdYNombre = path.join(__dirname, 'personajesId.json');
        fs.writeFileSync(rutaIdYNombre, JSON.stringify(nuevoArray, null, 2), "utf-8");

        console.log("✔✔✔ Archivo personajesId.json creado con éxito");
        console.log(nuevoArray);

    } catch (error) {
        console.log("Error en el creacion de archivo personajesId.json: ", error);
    }
}

//////Funcion de flujo de corroboracion de funcionamiento de cada ejercicio//////////
async function ResultadoTp() {
    // Se crea archivo personajes.json con los personajes traidos de la api
    await personajes();         // 1. Trae los personajes y los guarda en personajes.json

    await NuevoPersonaje();     // agrega un nuevo personaje a la Api
    await buscarPersonaje(12);  // busca personaje por id y lo muestra por consola 

    await agregarAlFinal();     // agrega un nuevo personaje al final a personajes.json
    await agregarDosAlInicio(); // agrega dos nuevos personajes al inicio a personajes.json
    await eliminarPersonaje();  // elimina el primer personaje de personajes.json

    // Se crea archivo personajesId.json con nombre y id de cada personaje de personajes.json
    await personajesId();
}

ResultadoTp();
/////////////////////////////////////////////////////////////////////////////////