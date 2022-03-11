const gallery$$ = document.querySelector(".gallery"); //aqui obtengo los elementos html que necesito
const input$$ = document.querySelector(".b-buscador input");
const button = document.querySelector("button");

const findPokemon = async (i) => {    //aqui llamo al API para obtener los datos de un pokemon
  let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(
    (res) => res.json()
  );
  return pokemon; //aqui me devuelve el pokemon
};

async function getPokemon() { // aqui la declaro async porque findPokemon depende de la API
  let result = [];
  for (let i = 1; i < 151; i++) { // aqui hago un bucle para obtener los 150 pokemons
    let pokemon = await findPokemon(i); 
    result.push(pokemon); // aqui meto el pokemon que he obtenido en "result"
  }
  return result;
}
function printPokemon(card) { // aqui me imprime la ficha de cada uno
  const ficha$$ = document.createElement("div");
  const title$$ = document.createElement("h1");
  const image$$ = document.createElement("img");
  const datos$$ = document.createElement("h3");
  const type$$ = document.createElement("h2");
  const attack$$ = document.createElement("h2");
  ficha$$.appendChild(title$$);
  ficha$$.appendChild(type$$);
  ficha$$.appendChild(image$$);
  ficha$$.appendChild(datos$$);
  ficha$$.appendChild(attack$$);

  title$$.textContent = card.name;
  image$$.src = card.sprites.other["official-artwork"].front_default;
  datos$$.textContent = card.id;
  type$$.textContent = card.types.map((item) => item.type.name);
  attack$$.textContent = "Attack:" + "\n" + card.stats[1].base_stat;
  ficha$$.className = "caja";

  gallery$$.appendChild(ficha$$);
}

button.addEventListener("click", search); // aqui añadí un evento al botón
function search() { //search es la función que se ejecuta cuando pulsamos el boton
  gallery$$.innerHTML= ""; // aqui limpio la galeria, si no se quedaba el resultado anterior
  getPokemon().then((pokemons) => {
    console.log(input$$.value);   // getPokemon nos devuelve una promesa y tenemos que programar en .then
    let filtrados = pokemons.filter((pokemon) => {    //aqui los filtro por nombre
      return pokemon.name.includes (input$$.value); //aqui compruebo que el nombre incluye lo que puse en el input
    });
    filtrados.forEach((pokemon) => {
      printPokemon(pokemon);  // aqui recorro los filtrados para pintarlos
    });
  });
}
search(); // aqui llamo a la función desde el principio