// Sirve para poderse ver entre otros ordenadores
var urlActual = (new URL(window.location.origin)).hostname;
const laravelApi = "http://"+urlActual+":8090";
// Recoge la fecha actual y la de mañana para la api de euskalmet
const ciudadesFavoritas = new Set();
var fecha = new Date();
var hoy = fecha.getFullYear() + '/' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' + fecha.getDate().toString().padStart(2, '0');

var fechamañana = new Date();
fechamañana.setDate(fecha.getDate() + 1);
var hoy1 = fechamañana.getFullYear() + (fechamañana.getMonth() + 1).toString().padStart(2, '0') + fechamañana.getDate().toString().padStart(2, '0');

// Mapa
var lugares = [{ "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896 }, { "nombre": "Donosti", "latitud": 43.3183, "longitud": -1.9812 }, { "nombre": "Bilbao", "latitud": 43.261992, "longitud": -2.935590 }, { "nombre": "Renteria", "latitud": 43.3119, "longitud": -1.8985 }, { "nombre": "Zarautz", "latitud": 43.284224, "longitud": -2.168719 }];
var map = L.map('mapid').setView([43.338, -1.788], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
lugares.forEach(lugar => {
    var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
    marker._icon.classList.add("huechange");
    var Popup = document.createElement('div');
    Popup.innerHTML = `<h5 id="PreccionManana">Mañana en ${lugar.nombre}</h5><p id="prediccionManana"></p><button class='tooltip-button' onclick='Lugar("${lugar.nombre}")'><ion-icon name="add-circle-outline" id="iconoAnadir"></ion-icon>Guardar en favoritos</button>`;
    marker.bindPopup(Popup, { permanent: true, direction: 'top', offset: L.point(0, -10) });
    marker.on('click', function () {
        LeeElemento(lugar.nombre.toLowerCase());
    });
});
let contador = 0;
function Lugar(nombre) {
    if (ciudadesFavoritas.size < 3) {
        const favoritos = document.getElementById('favoritos');
        ciudadesFavoritas.add(nombre);
        actualizarListaCiudades(nombre);
    } else {
        alert("Solo puedes guardar 3 ciudades favoritas.");
    }
}
function actualizarListaCiudades(nombre) {
    const favoritos = document.getElementById('favoritos');
    let stringListaCiudad = '';
    ciudadesFavoritas.forEach(x => {
        stringListaCiudad += `<li><a href="#" id="${x}" onclick="cambiarCiudad('${x}')"><ion-icon name="business-outline"></ion-icon><span>${x}</span></a></li>`;
        console.log(stringListaCiudad)
    });
    favoritos.innerHTML = stringListaCiudad;
    localStorage.setItem('ciudadesFavoritas', JSON.stringify(Array.from(ciudadesFavoritas)));
    if (ciudadesFavoritas.size > 0) {
        document.getElementById('ContendorRemove').style.visibility = 'visible';
    } else {
        document.getElementById('ContendorRemove').style.visibility = 'hidden';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const storedCiudades = localStorage.getItem('ciudadesFavoritas');
    if (storedCiudades) {
        const parsedCiudades = JSON.parse(storedCiudades);
        ciudadesFavoritas.clear();
        parsedCiudades.forEach(ciudad => {
            ciudadesFavoritas.add(ciudad);
        });
        actualizarListaCiudades();
    }
});
function eliminarCiudades() {
    ciudadesFavoritas.clear();
    actualizarListaCiudades();
}
// Drag and drop
$("#porcentajeLluvia,#porcentajeBruma,#porcentajeBrisa").on("dragstart", function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
})
$("#destino, #destinoInicio").on('dragover', function (event) {
    event.preventDefault();
});
$("#destino, #destinoInicio").on('drop', function (event) {
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData("text/plain");
    var draggedElement = document.getElementById(data);
    if (event.target !== draggedElement) {
        $(draggedElement).attr('draggable', true)

        console.log(draggedElement)
        var textoDrag = document.createElement('div');
        var parrafo = document.createElement('p');
        textoDrag.style.display = "inline-block"
        textoDrag.id = 'DragTexto';
        parrafo.id = "parrafo"
        // parrafo.innerHTML = "22KM/H";
        textoDrag.appendChild(draggedElement);
        textoDrag.appendChild(parrafo);
        event.target.appendChild(textoDrag);
    }
});

$("#destinoInicio").on('drop', function (event) {
    let texto = document.getElementById("DragTexto")
    let parrafo = document.getElementById("parrafo")
    parrafo.innerHTML = ''
})

// Array de las img
var ArrayImg = ["broken clouds", "scattered clouds", "cloud", "clouds", "overcast clouds", "clear sky", "few clouds", "shower rain", "light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "light intensity shower rain", "shower rain", "heavy intensity shower rain", "ragged shower rain", "rain", "thunderstorm", "snow", "mist", "smoke", "haze", "dust", "fog", "sand", "dust", "ash", "squall", "tornado", "Clear", "scattered clouds", "clear sky"];

// Carga del dia siguiente del mapa
function cambiarCiudad(x) {
    x = x.toLowerCase();

    fetch(laravelApi + `/api/getTiempoDato?ciudad=${x}`)
    .then(response => response.json())
    .then(data => {
        const ciudadSeleccionada = data.find(ciudad => ciudad.ciudad.toLowerCase() === x);
        
        if (ciudadSeleccionada) {
            document.getElementById("Temperatura").innerText = Math.floor(ciudadSeleccionada.temperatura_real)+"  ºC";
            document.getElementById("temperatura1prediccion").innerText = ciudadSeleccionada.temperatura_real+"  ºC";
            document.getElementById("AccionTiempo").innerText = ciudadSeleccionada.descripcion.charAt(0).toUpperCase() + ciudadSeleccionada.descripcion.slice(1);
            document.getElementById("LugarTiempo").innerHTML = `<ion-icon name="pin-outline"></ion-icon> ${ciudadSeleccionada.ciudad.charAt(0).toUpperCase() + ciudadSeleccionada.ciudad.slice(1)}, Gipuzkoa`;
            document.getElementById("TemperaturaFake").innerText = ciudadSeleccionada.temperatura_fake+"  ºC";
        }
    })
    .catch(error => {
        console.error("Error al cargar el archivo:", error);
    });
    datosEntiempoReal(x);
    
    const lugarSeleccionado = lugares.find(lugar => lugar.nombre.toLowerCase() === x);
    if (lugarSeleccionado) {
        const latitud = lugarSeleccionado.latitud;
        const longitud = lugarSeleccionado.longitud;
        console.log(latitud, longitud);
    
        fetch(`https://openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("temperatura2prediccion").innerText = data.daily[0].temp.day+"  ºC";
                document.getElementById("temperatura3prediccion").innerText = data.daily[1].temp.day+"  ºC";
                document.getElementById("temperatura4prediccion").innerText = data.daily[2].temp.day+"  ºC";                
            })
            .catch(error => {
                console.error("Error al cargar el archivo:", error);
            });
    } else {
        console.error("No se encontró la información de longitud y latitud para la ciudad seleccionada");
    } 
    
}

function datosEntiempoReal(x) {
    x = x.toLowerCase();
    setInterval(() => {
        fetch(laravelApi + `/api/getTiempoDato?ciudad=${x}`)
        .then(response => response.json())
        .then(data => {
            const ciudadSeleccionada = data.find(ciudad => ciudad.ciudad.toLowerCase() === x);
            
            if (ciudadSeleccionada) {
                document.getElementById("TemperaturaFake").innerText = ciudadSeleccionada.temperatura_fake+"  ºC";
            }
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
    }, 10000);
       
}


// Euskalmet
function LeeElemento(ciudad) {
    console.log(ciudad);

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXpAcGxhaWF1bmRpLm5ldCJ9.ZmfkGF-z9FBhEZ4ztLWvaNC19fJRtc2DQQmdr0dQhzX740ZJRMSfpUt9naCP9RNMfbzJoZDqthv70SYWJ8OtycNcS-JiYBpwA0-jBOmxEVoxnDHz_sPLn8oBejh44cabfiOQMaI70L5GnRlZPlz3HUnD58QahJJZHEWMmXz8KvakjJeLF4Pb-s9FvBVi8cZpNZK5E83qHCvNEMrPN0FM_xTZPQTm4B3DV2WbvygVx8wQAFelr5EqkTEskIT_rxU_OHSPDqAGwhCfOMfyzqubKssfHFS5mDxu-7bbZKh58FTRPNzv7aNeU9pGQ3CKznzFhjsuWIYPZj-uRb6AMTs69w'
        }
    };

    switch (ciudad) {
        case 'irun':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${hoy}/for/${hoy1}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("prediccionManana").textContent = data.temperature.value + " Cº";
                })
                .catch(error => {
                    console.error("Error al cargar el archivo:", error);
                });
            break;
        case 'donosti':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${hoy}/for/${hoy1}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("prediccionManana").textContent = data.temperature.value + " Cº";
                })
                .catch(error => {
                    console.error("Error al cargar el archivo:", error);
                });
            break;
        case 'bilbao':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/${hoy}/for/${hoy1}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("prediccionManana").textContent = data.temperature.value + " Cº";
            })
            .catch(error => {
                console.error("Error al cargar el archivo:", error);
            });
        break;
        case 'renteria':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${hoy}/for/${hoy1}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("prediccionManana").textContent = data.temperature.value + " Cº";
            })
            .catch(error => {
                console.error("Error al cargar el archivo:", error);
            });
        break;
        case 'zarautz':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/zarautz/forecast/at/${hoy}/for/${hoy1}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("prediccionManana").textContent = data.temperature.value + " Cº";
                })
                .catch(error => {
                    console.error("Error al cargar el archivo:", error);
                });
            break;
        default:
            console.log('Ciudad no reconocida');
    }
}


// https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${hoy}/for/${hoy1}
// https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/zarautz/forecast/at/2024/01/18/for/20240119
//`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/donostialdea/locations` errenteria y Donostia
// `https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/great_bilbao/locations` bilbao y barakaldo
// 

