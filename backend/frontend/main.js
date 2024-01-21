document.addEventListener("DOMContentLoaded",function(){
    eel.expose(display_poke_list);
    eel.expose(display_pokemon)

    eel.get_pokemon_list()(display_poke_list);

})


const clickedmons=new Set();

function display_poke_list(poke_list){

    console.log("Displaying Pokemon List");
    console.log(poke_list)
    const pokemonListDiv=document.getElementById("pokemon-list");
    pokemonListDiv.innerHTML=''
    for (let i = 0; i < poke_list.length; i++) {
        const pokemon = poke_list[i];

        const listItem = document.createElement('div');
        listItem.textContent = pokemon;
        listItem.className = 'listitem';
        listItem.id=`${pokemon}`


        listItem.onclick = function () {

            if(!clickedmons.has(pokemon)){
                clickedmons.add(pokemon)
                eel.get_pokemon_details(pokemon)(display_pokemon);
            } 
        };

        pokemonListDiv.appendChild(listItem);
        
        
    }
}

function display_pokemon(pokemonDetails) {
    parent=document.getElementById(`${pokemonDetails.name}`);
    
    if(pokemonDetails){
        const child =document.createElement("div");

        child.innerHTML=`
        <div class="pokemon-details">
            <div>
                <figure class="left">
                    <img src="${pokemonDetails.default}">
                    <figcaption>Normal</figcaption>
                </figure>
                <figure class="right">
                    <img src="${pokemonDetails.shiny}">
                    <figcaption>Shiny</figcaption>
                </figure>
            </div>
            <p><strong>Name:</strong> ${pokemonDetails.name}</p>
            <p><strong>Height:</strong> ${pokemonDetails.height}</p>
            <p><strong>Weight:</strong> ${pokemonDetails.weight}</p>
        </div>`;
           
        
        parent.appendChild(child)
    }else{
        child=`<div>Error</div>`
        parent.appendChild(child)
    }

}
   

