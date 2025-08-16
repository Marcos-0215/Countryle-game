
/****** PUXANDO LISTA DE NOMES DE PAISES ******/


/*
const countries = [
  { name: "Brasil", continent: "América do Sul", population: 213, capital: "Brasília" },
  { name: "Argentina", continent: "América do Sul", population: 45, capital: "Buenos Aires" },
  { name: "França", continent: "Europa", population: 67, capital: "Paris" },
  { name: "Japão", continent: "Ásia", population: 126, capital: "Tóquio" }
];
*/

const xhr = new XMLHttpRequest();
let countries;
let secret; // País Resposta

xhr.addEventListener('load', () => {
  countries = JSON.parse(xhr.response);
  //console.log(xhr.response);
  //console.log(typeof countries);

  fillDatalist(countries);
  draftSecret();
  /*
  countries.forEach(c => {
    console.log(c.name.common);
  });
  */
});

xhr.open('GET', 'https://restcountries.com/v3.1/all?fields=name');
xhr.send();





function fillDatalist(list) {

  const datalist = document.getElementById('countries-datalist');

  list.sort((a, b) => {
    return a.name.common.localeCompare(b.name.common)
  });

  list.forEach(c => {
    const option = document.createElement('option');
    option.value = c.name.common;
    datalist.appendChild(option);
    
  });
  
}

// Resposta -> um país aleatório 
function draftSecret() {
  secret = countries[Math.floor(Math.random() * countries.length)];
}







const checkBtn = document.getElementById('check-guess-btn');

checkBtn.addEventListener('click', () => {
  checkGuess();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkGuess();
  }  
});

let triesQnt = 0;



function checkGuess() {
  const input = document.getElementById("guess-input").value.trim();
  const feedback = document.getElementById("feedback");
  const history = document.getElementById("tries");

  if (!input) return;

  triesQnt++;

  const guess = countries.find(c => c.name.common.toLowerCase() === input.toLowerCase());

  if (!guess) {
    feedback.textContent = "❌ País não encontrado!";
    return;
  }

  //console.log(guess.name.common);
  //console.log(secret.name.common);


  if (guess.name.common === secret.name.common) {
    feedback.textContent = "🎉 Acertou! O país era " + secret.name.common;
  } else {
    feedback.textContent = "🔎 Dica adicionada!";
    const li = document.createElement("li");
    li.textContent = `Seu palpite: ${guess.name.common} | Continente: ${guess.continent} | População: ${guess.population}M | Capital: ${guess.capital}`;
    history.appendChild(li);
  }

  document.getElementById("guess-input").value = "";
}




