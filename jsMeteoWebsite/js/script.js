let circleBtnSearch = document.querySelector(".circle-srchbar");
//Mostra e nascondi searchbar
circleBtnSearch.onclick = function() {
    window.onkeypress = function() {
        srchBar.click()
    }
    srchBar.hidden = !srchBar.hidden;
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

//----------DISPLAYRESULTS------------
function displayResults(weather) {

    //il valore può essere Clouds, Clear, etc...
    let apiMeteo = weather.weather[0].main;

        //Rimane così perché non pensavo funzionasse, e invece :)
        function lollino() {
            console.log("CIAO AMICO MIO");
            apiMeteo = "Atmosphere"
        }
        
        //SE il valore di apiMeteo è Mist o Smoke o... ALLORA invoca la funziona, tanto l'icona è sempre la stessa
        switch(apiMeteo) {
            case "Mist":
                lollino()
                break;
            case "Smoke":
                lollino();
                break;
            case "Haze":
                lollino();
                break;
            case "Dust":
                lollino();
                break;
            case "Fog":
                lollino();
                break;
            case "Sand":
                lollino();
                break;
            case "Ash":
                lollino();
                break;
            case "Squall":
                lollino();
                break;
            case "Tornado":
                lollino();
                break;
    
        }

    
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
  
    let imgUrl = apiMeteo.toLowerCase(); //trovo la cartella, avendo la lettera iniziale minuscola
    
    //giorno o notte?
    let dayornight = (weather.weather[0].icon).includes("n"); //SE l'icona contiene la lettera 'n' che sta per notte [true], ALLORA è notte, ALTRIMENTI è giorno
        
    let isDay = "-s";
    let isNight = "-m";

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
    
    //informazioni aggiuntive: umidità, vento ...

    //umidità
    let humidityP = document.querySelector("#humidity");
    humidityP.textContent = weather.main.humidity + "%";
    //vento
    let windP = document.querySelector("#wind");
    windP.textContent = Math.round(weather.wind.speed) + " km/h";
    //nuvole (prova a contarle hihi)
    let cloudsP = document.querySelector("#clouds");
    cloudsP.textContent = weather.clouds.all;


    //>>>>>>CHECKLIST
//aggiungi le immagini ad ogni meteo --FATTO 2/06
//cambia l'icona da geolocalizzata a posizione pin --FATTO 2/06
//sistema i giorni successivi --> Mostra informazioni necessarie --FATTO 2/06, da aggiustare l'animazione
//collega i dati aggiuntivi all'API

} //fine funzione DisplayResults

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
let arrowInfo = document.querySelector("#arrow");

moreInfoContainer.onclick = function(){
    if(moreInfoP.textContent == "Più informazioni") {

        moreInfoContainer.style.animation = "todown .4s ease-in-out  forwards"; //div che si allunga
        moreInfoP.textContent = "Meno informazioni";
        moreInfoUl.style.visibility = "visible"; //lista non ordinata resa visibile
        moreInfoUl.style.animation = "showLi .3s ease-in-out forwards .2s" //lista non ordinata animazione
        arrowInfo.style.transform = "rotate(180deg)";
    } else {

        moreInfoP.textContent = "Più informazioni";
        moreInfoContainer.style.animation = "toup .4s ease-in-out forwards"; //div che si accorcia
        moreInfoUl.style.animation = ".2s" //lista non ordinata animazione
        arrowInfo.style.transform = "rotate(360deg)";
        
    }
   
}