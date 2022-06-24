window.addEventListener("DOMContentLoaded", function () {
    crearHtml();
});

// Variables globales
const search_input = document.getElementById("search_input");
const search_button = document.getElementById("search_button");
const container_card = document.getElementById("container_card");
const container_search = document.getElementById("container_search");

// Uso del archivo JSON
let json = JSON.parse(file);
let catalogo_pokemones = json.result;

// Contenedor "container" con la creación de tarjetas para cada elemento del JSON "pokemones"
const crearHtml = () => {
    catalogo_pokemones.forEach((pokemones) => {
        const card = document.createElement("div");
        card.classList.add("col-sm-3", "d-flex", "flex-column");
        card.innerHTML = `
        <img id="card_img" onClick="card_img()" class="border border-1" src="${pokemones.ThumbnailImage}">
        <p class="text-secondary">Número: ${pokemones.number}</p>
        <h2>${pokemones.name}</h2>
        <div class="bg-success ps-3 mb-5 w-50 rounded text-white"><p>${pokemones.type}</p></div>
        `;
        container_card.appendChild(card);
    });
}



// Función: Muestra el DIV con la información completa del pokemon
const card = () => {
    // Elimina todo los elementos HTML del div "container"
    container_card.innerHTML = "";

    const tarjeta = document.createElement("div"); 
    tarjeta.innerHTML = `
    <div class="row mx-3">
        <h1 class="d-flex">${catalogo_pokemones.name} <h6 class="text-secondary">Número: ${catalogo_pokemones.number}</h6></h1>
        <div class="col-4 ml-5">
            <img class="mx-auto d-block border border-1" src="${catalogo_pokemones.ThumbnailImage}">
        </div>
        <div class="col-8 bg-success text-white bg-opacity-75 mr-5 p-4">
            <p class="">Altura:
                <span class="">${catalogo_pokemones.height}</span>
            </p>
            <p class="">Peso:
                <span class="">${catalogo_pokemones.weight}</span>
            </p>
            <p class="">Habilidades:
                <span class="">${catalogo_pokemones.abilities}</span>
            </p>
            <p class="">Tipo:
                <span class="">${catalogo_pokemones.type}</span>
            </p>
        </div>
        <div class="btn-regresar mt-4">
            <button type="button" id="btn_regresar" onclick="location.reload()" class="btn btn-dark">Ir al Pokédex</button>
        </div>
    </div>`
    container_search.appendChild(tarjeta);
}

// Función "card_img" permite crear el DIV con la información del pokemon seleccionado
const card_img = () => {
    card();
}

// Función "search_inp" para buscar el pokemon mediante el boton "search_btn"
const search = () => {
    catalogo_pokemones = search_pokemon(search_input.value)
    search_input.value = ""; 
    card();
}

// Función: Buscar un pokemon por el nombre o número de identificación
const search_pokemon = (pokemon_name) => {
    for (let i = 0; i <catalogo_pokemones.length; i++) {
        if (catalogo_pokemones[i].name == pokemon_name) {
            return catalogo_pokemones[i]
        }
    }    
    if(pokemon_name != catalogo_pokemones.name )  {
        const tarjeta = document.createElement("div"); 
        tarjeta.innerHTML = `
            <div class="container p-5 my-5 bg-dark text-white">
                <h1>Ningún Pokémon coincide con tu búsqueda</h1>
                <p>Ingresa nuevamente el nombre del pokemon que deseas buscar.</p>
            </div>
            <div class="btn-regresar btn_reg">
                <button type="button" id="btn_regresar" onclick="location.reload()" class="btn btn-success">Intentar de nuevo</button>
            </div>
        `
        container_search.appendChild(tarjeta);
        return;
    }
}


