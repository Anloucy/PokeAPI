const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.querySelector('input')
const pokeInfo = document.getElementById("pokemon-info"); 

const list = []

async function GetPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await response.json();

    data.results.forEach(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url)
        const pokemonData = await pokemonResponse.json()
        list.push(pokemonData)
        createPokemonCard(pokemonData)
    })
}

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
        showingPokemon(findPokemon(pokeName))
        
        console.log(findPokemon(pokeName))
    });
}

function findPokemon(pokeName){
    let pokemon = list.find((poke) => poke.name === pokeName)
    return pokemon
}


function showingPokemon(pokemon){
    pokeInfo.style.display = 'block'

    let pokeName = document.getElementById("pokemon-info-name");
    pokeName.textContent = (pokemon.name).charAt(0).toUpperCase() + pokemon.name.slice(1) + ":";

    let pokeSprite = document.getElementById("pokemon-info-photo");
    pokeSprite.src = pokemon.sprites.front_default;
    pokeSprite.setAttribute.alt = "pokemon's sprite";

    let pokeId = document.getElementById("pokemon-id")
    pokeId.textContent = `ID: #${pokemon.id}`;
    let pokeHeight = document.getElementById("pokemon-height")
    pokeHeight.textContent = `Height: ${pokemon.height}`;
    let pokeWeight = document.getElementById("pokemon-weight")
    pokeWeight.textContent = `Weight: ${pokemon.weight}`;

    let pokeType1 = document.getElementById("pit 1")
    pokeType1.textContent = pokemon.types[0].type.name;
    let pokeType2 = document.getElementById("pit 2")
    pokeType2.textContent = pokemon.types[1]?.type.name;

    let pokeAblt1 = document.getElementById("pia 1")
    pokeAblt1.textContent = pokemon.abilities[0].ability.name;
    let pokeAblt2 = document.getElementById("pia 2")
    pokeAblt2.textContent = pokemon.abilities[1]?.ability.name;
}

document.getElementById("btn-pokemonInfo").addEventListener('click', function(){
    pokeInfo.style.display="none"
    pokeInfo.dataset.id = ""
})

input.addEventListener('input', function (){
    let userInput = input.value.toLowerCase()

    const filtered = list.filter(pokemon => pokemon.name.toLowerCase().includes(userInput))

    const suges = filtered.map(pokemon => pokemon.name)

    const sugestions = document.getElementById("sugestions")
    
    sugestions.innerHTML = "";

    suges.forEach(sugestao => {
        const listItem = document.createElement("li");
        const btnItem = document.createElement('button')
        btnItem.classList.add("btnSugestion");
        btnItem.textContent = sugestao;

        btnItem.addEventListener('click', function(){
            showingPokemon(findPokemon(btnItem.textContent))
            sugestions.innerHTML = ""
            input.value =""
        })
        listItem.append(btnItem)
        sugestions.appendChild(listItem);
    });
    
    document.addEventListener('click', function(event) {
        if (!input.contains(event.target) && !sugestions.contains(event.target)) {
            sugestions.innerHTML = "";
            input.value = ""
        }
    });
});

document.getElementById("themeSwitcher").addEventListener('click', function() {
    if(main.dataset.theme === "light"){
        root.style.setProperty("--bg-color", "#242424")
        root.style.setProperty("--pc-color", "#151515")
        root.style.setProperty("--text-color", "#ffffff")
        main.dataset.theme ="dark"
    }else{
        root.style.setProperty("--bg-color","#F5F5F5")
        root.style.setProperty("--pc-color", "#fffffff")
        root.style.setProperty("--text-color", "#000000")
        main.dataset.theme="light"
    }
})

GetPokemon()