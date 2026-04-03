////////////////// Ejercicio 1a///////////////////////////

const url = 'https://thronesapi.com/api/v2/Characters';

async function personajes() {

    try{
        const resp = await fetch(url);

        if (!resp.ok) {
            console.log('error');
        }

        const datos = await resp.json();
        console.log(datos);

    }catch (error){
        console.log(`error -> ${error}`);
    }
}

////////////////////// Ejercicio 1b////////////////////

async function NuevoPersonaje() {
    try{
        const agregar = {
            "id": 0,
            "firstName": "Nuevo",
            "lastName": "Personaje",
            "fullName": "Nuevo Personaje",
            "title": "Agregado",
            "family": "Los Nuevos",
            "image": "x.jpg",
            "imageUrl": "x.com",
        };
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agregar)
        });
        
        
        //corrobora status: 200 , indica que la solicitud se ha procesado correctmamente .
        console.log("Estado de la respuesta (Status):", resp.status);


        if (!resp.ok) {
            console.log('Error. Por favor verifique los datos');
            return;
        }
      
        const datos = await resp.json();
        console.log('Personaje agregado con exito:', datos);

        } 
        
        catch (error) {
        console.log(`error -> ${error}`);
        }
}

/////////////////// Ejerciocio 1c////////////////

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

/////////sacar comentario, para probar y ejecutar, luego se elimina para tener el codigo limpio//////////
// Prueba de funcionamiento del 1.a (Traer todos)
personajes();

//prueba de funcionamiento 1.b (Crear uno nuevo)
NuevoPersonaje();

//prueba de funcionamiento 1.c (Buscar por ID )
buscarPersonaje(12);
 





