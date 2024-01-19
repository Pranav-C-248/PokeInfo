document.addEventListener("DOMContentLoaded",function(){
    eel.expose(display_poke_list);
    eel.expose(display_pokemon)

    eel.get_pokemon_list()(display_poke_list);

})

function display_poke_list(poke_list){

    console.log("Displaying Pokemon List");
    console.log(poke_list)
    const pokemonListDiv=document.getElementById("pokemon-list");

    for(let i=0;i<poke_list.length;i++)
    {
        const pokemon=poke_list[i];
        const listItem = `<li onclick="getPokemonDetails('${pokemon}')">${pokemon}</li>`;
        pokemonListDiv.innerHTML+=listItem
    }
}

function display_pokemon(pokemonDetails) {
    const pokemonDetailsDiv = document.getElementById('pokemon-details');
    pokemonDetailsDiv.innerHTML = '<h2>Pokémon Details</h2>';

    if (pokemonDetails) {
        const details = `
            <p>Name: ${pokemonDetails.name}</p>
            <p>Height: ${pokemonDetails.height}</p>
            <p>Weight: ${pokemonDetails.weight}</p>
            <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name} front sprite">
            <img src="${pokemonDetails.sprites.back_default}" alt="${pokemonDetails.name} back sprite">
        `;
        pokemonDetailsDiv.innerHTML += details;
    } else {
        pokemonDetailsDiv.innerHTML += '<p>Error loading Pokémon details.</p>';
    }
}

function getPokemonDetails(pokemonName) {
    eel.get_pokemon_details(pokemonName)();
}