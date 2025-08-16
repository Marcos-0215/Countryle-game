
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
let target; // País Resposta

xhr.addEventListener('load', () => {
  countries = JSON.parse(xhr.response);
  console.log(countries);
  //console.log(typeof countries);

  fillDatalist(countries);
  draftTarget();
  /*
  countries.forEach(c => {
    console.log(c.name.common);
  });
  */
});

const url = 'https://restcountries.com/v3.1/all?fields=name,continents,population,region,subregion,latlng';

xhr.open('GET', url);
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
function draftTarget() {
  target = countries[Math.floor(Math.random() * countries.length)];
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
let gameOn = true;


function checkGuess() {
  const input = document.getElementById("guess-input").value.trim();
  const feedback = document.getElementById("feedback");
  const history = document.getElementById("tries");

  if (!input || !gameOn) return;

  triesQnt++;

  const guess = countries.find(c => c.name.common.toLowerCase() === input.toLowerCase());

  if (!guess) {
    feedback.textContent = "❌ País não encontrado!";
    return;
  }

  //console.log(guess.name.common);
  //console.log(target.name.common);
  const targetName = target.name.common;
  const targetContinent = target.region;
  const targetPopulation = target.population;
  const targetLatitude = target.latlng[0];
  const targetLongitude = target.latlng[1];

  let targetHemisphere;
  if (targetLatitude>=0) {
    targetHemisphere = 'Northern';
  } else {
    targetHemisphere = 'Southern';
  }

  const guessName = guess.name.common;
  const guessContinent = guess.region;
  const guessPopulation = guess.population;
  const guessLatitude = guess.latlng[0];
  const guessLongitude = guess.latlng[1];
  let guessHemisphere;
  if (guessLatitude>=0) {
    guessHemisphere = 'Northern';
  } else {
    guessHemisphere = 'Southern';
  }
  
  
  console.log(guessContinent);
  console.log(guessPopulation);
  console.log(guessLatitude);
  console.log(guessLongitude);

  console.log(targetName);
  

  if (guessName === targetName) {
    feedback.textContent = "🎉 Acertou! O país era " + targetName;
    gameOn = false;

    const answer = document.createElement("li");
    answer.textContent = `RESPOSTA: ${targetName} | Hemisfério: ${targetHemisphere}  | Continente: ${targetContinent} | População: ${targetPopulation} | Latitude: ${targetLatitude} | Longitude: ${targetLongitude}`;
    history.appendChild(answer);

  } else {

    feedback.textContent = "🔎 Dica adicionada!";

    const palpiteDiv = document.createElement("div");
    palpiteDiv.classList.add("history-entry");

    const attemptSpan = document.createElement("span");
    attemptSpan.textContent = `TENTATIVA ${triesQnt} de 6: `;
    attemptSpan.classList.add("history-attempt"); 

    
    const nameSpan = document.createElement("span");
    nameSpan.textContent = guessName;
    nameSpan.classList.add("history-name"); 

    if (guessName === targetName) {
      nameSpan.classList.add('correct');
    }

    const hemisphereSpan = document.createElement("span");
    hemisphereSpan.textContent = guessHemisphere;
    hemisphereSpan.classList.add("history-name"); 

    if (guessHemisphere === targetHemisphere) {
      hemisphereSpan.classList.add('correct');
    }

    const continentSpan = document.createElement("span");
    continentSpan.textContent = guessContinent;
    continentSpan.classList.add("history-continent");

    if (guessContinent === targetContinent) {
      continentSpan.classList.add('correct');
    }

    const populationSpan = document.createElement("span");
    populationSpan.classList.add("history-population");

    const popValue = document.createElement("span");
    popValue.textContent = guessPopulation;

    const arrow = document.createElement("span");
    if (guessPopulation < targetPopulation) {
      arrow.textContent = "↑";
    } else if (guessPopulation > targetPopulation) {
      arrow.textContent = "↓";
    }     
    arrow.classList.add("arrow");
    populationSpan.append(popValue, arrow);

    if (guessPopulation >= targetPopulation*0.8 && guessPopulation <= targetPopulation*1.2 ) {
      populationSpan.classList.add('correct20');
    } else if (guessPopulation >= targetPopulation*0.6 && guessPopulation <= targetPopulation*1.4) {
      populationSpan.classList.add('correct40');
    }

    console.log("Target " + targetPopulation);
    console.log("Guess " + guessPopulation);
    console.log("Min20 " + targetPopulation*0.8);
    console.log("Max20 " + targetPopulation*1.2);
    console.log("Min40 " + targetPopulation*0.6);
    console.log("Max40 " + targetPopulation*1.4);


    const latitudeSpan = document.createElement("span");
    latitudeSpan.textContent = guess.latlng[0];
    latitudeSpan.classList.add("history-latitude");

    const longitudeSpan = document.createElement("span");
    longitudeSpan.textContent = guess.latlng[1];
    longitudeSpan.classList.add("history-longitude");


    palpiteDiv.append(attemptSpan, nameSpan, hemisphereSpan, continentSpan, populationSpan, latitudeSpan, longitudeSpan);


    history.appendChild(palpiteDiv);


  }

  

  if (triesQnt===6) {
    feedback.textContent = "Acabaram as tentativas! O país era " + targetName;
    gameOn = false;
  }


  document.getElementById("guess-input").value = "";
}




