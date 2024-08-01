/////////////////////////////////////////////////////////////////////////////////
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const spriteContainer = document.getElementById("sprite-container");
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const typesStat = document.getElementById("types");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

/* Functions */
const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value;
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await res.json();
    console.log(data);
    pokemonID.textContent = `#${data.id}`;
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front_default sprite">`;

    const { types } = data;
    const items = data.stats;
    types.forEach(
      (el) =>
        (typesStat.innerHTML += `<span id="type">${el.type.name.toUpperCase()}</span>`)
    );

    hp.textContent = items[0].base_stat;
    attack.textContent = items[1].base_stat;
    defense.textContent = items[2].base_stat;
    specialAttack.textContent = items[3].base_stat;
    specialDefense.textContent = items[4].base_stat;
    speed.textContent = items[5].base_stat;
  } catch (err) {
    console.error(err);
    alert("Pokémon not found");
    reset();
  }
};
const reset = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";

  pokemonID.textContent = "";
  pokemonName.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  spriteContainer.innerHTML = "";
};

// Form:
searchForm.addEventListener("submit", (e) => {
  typesStat.innerHTML = "";
  e.preventDefault();
  reset();
  getPokemon();
  searchInput.value = "";
});
