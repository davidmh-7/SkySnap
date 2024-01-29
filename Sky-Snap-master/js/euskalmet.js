var fecha = new Date();
var hoy = fecha.getFullYear() + '/' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' + fecha.getDate().toString().padStart(2, '0');

// Coge el dia siguiente sin barras
var fechamañana = new Date();
fechamañana.setDate(fecha.getDate() + 1);
var hoy1 = fechamañana.getFullYear() + (fechamañana.getMonth() + 1).toString().padStart(2, '0') + fechamañana.getDate().toString().padStart(2, '0');

function LeeElemento() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXpAcGxhaWF1bmRpLm5ldCJ9.ZmfkGF-z9FBhEZ4ztLWvaNC19fJRtc2DQQmdr0dQhzX740ZJRMSfpUt9naCP9RNMfbzJoZDqthv70SYWJ8OtycNcS-JiYBpwA0-jBOmxEVoxnDHz_sPLn8oBejh44cabfiOQMaI70L5GnRlZPlz3HUnD58QahJJZHEWMmXz8KvakjJeLF4Pb-s9FvBVi8cZpNZK5E83qHCvNEMrPN0FM_xTZPQTm4B3DV2WbvygVx8wQAFelr5EqkTEskIT_rxU_OHSPDqAGwhCfOMfyzqubKssfHFS5mDxu-7bbZKh58FTRPNzv7aNeU9pGQ3CKznzFhjsuWIYPZj-uRb6AMTs69w'
        }
    };

    fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${hoy}/for/${hoy1}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            document.getElementById("temperatura").textContent = data.temperature.value;
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}
// https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${hoy}/for/${hoy1}
// https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/zarautz/forecast/at/2024/01/18/for/20240119
//`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/donostialdea/locations` errenteria y Donostia
// `https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/great_bilbao/locations` bilbao y barakaldo
// 