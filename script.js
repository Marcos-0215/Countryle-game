
/****** POUXANDO LISTA DE NOMES DE PAISES ******/

// Lista simplificada de países
const countries = [
  { name: "Brasil", continent: "América do Sul", population: 213, capital: "Brasília" },
  { name: "Argentina", continent: "América do Sul", population: 45, capital: "Buenos Aires" },
  { name: "França", continent: "Europa", population: 67, capital: "Paris" },
  { name: "Japão", continent: "Ásia", population: 126, capital: "Tóquio" }
];


const datalist = document.getElementById('countries-datalist');


countries.forEach(c => {
  const option = document.createElement('option');
  option.value = c.name;
  datalist.appendChild(option);

});



// Resposta -> um país aleatório 
const secret = countries[Math.floor(Math.random() * countries.length)];


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

  const guess = countries.find(c => c.name.toLowerCase() === input.toLowerCase());

  if (!guess) {
    feedback.textContent = "❌ País não encontrado!";
    return;
  }

  if (guess.name === secret.name) {
    feedback.textContent = "🎉 Acertou! O país era " + secret.name;
  } else {
    feedback.textContent = "🔎 Dica adicionada!";
    const li = document.createElement("li");
    li.textContent = `Seu palpite: ${guess.name} | Continente: ${guess.continent} | População: ${guess.population}M | Capital: ${guess.capital}`;
    history.appendChild(li);
  }

  document.getElementById("guess-input").value = "";
}




