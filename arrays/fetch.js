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

personajes();