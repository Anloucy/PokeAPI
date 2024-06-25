const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.querySelector('input')

function createPokemonCard(pokemon){
    const card = document.createElement('div')
    card.classList.add('poke')

    const pokeName = pokemon.name
    const name = document.createElement('p')
    name.classList.add('pokeName')
    name.textContent = pokeName

    const img = document.createElement('img')
    img.src = pokemon.sprites.front_default
    img.alt = pokeName

    card.append(img, name)
    document.querySelector('#pokemons').append(card)
    
    card.addEventListener("click", function (){
        const dialog = document.querySelector(".dialog"); 
        dialog.showModal();
    });
    
    const closeButton = document.getElementById('close-dialog'); 
    closeButton.addEventListener('click', function() {
        const dialog = document.querySelector(".dialog");
        dialog.close(); 
    });
}

const list = []

async function GetPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await response.json();
    
    data.results.forEach(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url)
        const pokemonData = await pokemonResponse.json()
        list.push(pokemon)
        createPokemonCard(pokemonData)
    })
}

GetPokemon()


input.addEventListener('input', function (){
    let userInput = input.value.toLowerCase()

    const filtered = list.filter(pokemon => pokemon.name.toLowerCase().includes(userInput))

    const suges = filtered.map(pokemon => pokemon.name)
    const sugestions = document.getElementById("sugestions")
    
    sugestions.innerHTML = "";

    suges.forEach(sugestao => {
        const listItem = document.createElement("li");
        listItem.textContent = sugestao;
        sugestions.appendChild(listItem);
    });
    input.addEventListener("blur", function() {
        sugestions.innerHTML = "";
        input.textContent = "";
    });
});

document.getElementById("themeSwitcher").addEventListener('click', function() {
    if(main.dataset.theme === "dark"){
        root.style.setProperty("--dk-color", "#454546")
        root.style.setProperty("--bk-color", "#000000")
        root.style.setProperty("--fk-color", "#ffffff")
        main.dataset.theme="light"
    }else{
        
        root.style.setProperty("--dk-color","#d3d3d3")
        root.style.setProperty("--bk-color", "#fffffff")
        root.style.setProperty("--fk-color", "#000000")

        main.dataset.theme ="dark"
    }
})