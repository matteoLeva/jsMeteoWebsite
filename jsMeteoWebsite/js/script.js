let circleBtnSearch = document.querySelector(".circle-srchbar");
//Mostra e nascondi searchbar
circleBtnSearch.onclick = function() {
    srchbar.hidden = !srchbar.hidden;
}

//API
const api = {
    key: "e99f804f25b81b09c170fdcceafe154f",
    apiUrl: "https://api.openweathermap.org/data/2.5/"
}

//variabile per la barra di ricerca
const srchBar = document.querySelector("#srchbar");

//se preme INVIO allora restituisci le informazioni
srchBar.addEventListener('keypress', setQuery);

//creo la funzione setQuery, che richiede le info all'API
function setQuery(event) { 
    if(event.keyCode == 13) { //13 è l'unicode che corrisponde al tasto INVIO
        getResults(srchBar.value); //in input la città e in output le informazioni
        srchBar.value = "";
        srchbar.hidden = !srchbar.hidden;
    }
}

//creo la funzione getResults
function getResults(query) {
    fetch(`${api.apiUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

//creo la funzione displayResults, per mostrare le informazioni prese dall'API
function displayResults(weather) {
console.log(weather);
//icona posizione
let iconPosition = document.querySelector("#icon-position");
iconPosition.textContent = "room";
//nome città
let city = document.querySelector("#nm-luogo");
city.textContent = `${weather.name}` //sostituisce il nome della città
//temperatura
let temperature = document.querySelector("#temperature");
let numberTemp = weather.main.temp;
temperature.textContent = `${Math.round(numberTemp)}°c`;
//icona del meteo ...
let meteoIcon = document.querySelector(".meteo-icon");
let apiMeteo = weather.weather[0].main;
let imgUrl = apiMeteo.toLowerCase(); //trovo la cartella
console.log(imgUrl)
//giorno o notte?
let dayornight = (weather.weather[0].icon).includes("n"); //SE l'icona contiene la lettera 'n' che sta per notte [true], ALLORA è notte, ALTRIMENTI è giorno
console.log(dayornight)
    //console.log(weather.weather[0].icon)
let isDay = "-s";
let isNight = "-m";

    console.log("Meteo" + apiMeteo);

//funzione che restituisce -s se giorno, -m se notte (s = sun, m = moon)
let dOrN = () => {

        if (dayornight == true) {
            return isNight
        } else {
            return isDay
        }
    
};
//
meteoIcon.setAttribute("src",`img/${imgUrl}/${imgUrl}${dOrN()}-b.png`);
//cambia frase in base alla temperatura
let frase = document.querySelector("#caption");
for(let i = 0; i <= numberTemp; i++) {
    if(i <= 10) {
        frase.textContent = frasiArray.under10;
    } else if (i < 17) {
        frase.textContent = frasiArray.over10;
    } else if(i < 24) {
        frase.textContent = frasiArray.over20; 
    } else if(i < 29) {
        frase.textContent = frasiArray.over25;
    } else {
        frase.textContent = frasiArray.over30;
    }
    }

    //>>>>>>CHECKLIST
//aggiungi le immagini ad ogni meteo --FATTO 2/06
//cambia l'icona da geolocalizzata a posizione pin --FATTO 2/06
//sistema i giorni successivi --> Mostra informazioni necessarie
}

//array con le frasi predefinite
let frasiArray = {
    under10: "Hey guarda! Un pinguino",
    over10: "Conviene portare il cappotto",
    over20: "Non fa freddo dai",
    over25: "Una t-shirt va più che bene",
    over30: "Fa caldo assai"
}

//ANIMAZIONE
let moreInfoContainer = document.querySelector(".moreinfo-container");
let moreInfoP = document.querySelector("#moreinfo");
let moreInfoUl = document.querySelector(".moreinfo-ul");

moreInfoContainer.onclick = function(){
    if(moreInfoP.textContent == "Più informazioni") {
        moreInfoContainer.style.animation = "todown .6s ease  forwards";
        moreInfoP.textContent = "Meno informazioni";
        moreInfoUl.style.visibility = "visible";
        moreInfoUl.style.animation = "showLi 1s ease forwards"
    } else {
        moreInfoContainer.style.animation = "toup .6s ease forwards";
        moreInfoP.textContent = "Più informazioni";
        
        moreInfoUl.style.visibility = "hidden";
        
    }
   
}