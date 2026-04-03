// Ejercicio 1a

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
// Ejercicio 1b

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
personajes();
NuevoPersonaje();





