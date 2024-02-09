const cloud = document.getElementById("cloud"), barraLateral = document.querySelector(".barra-lateral"), spans = document.querySelectorAll("span"), palanca = document.querySelector(".switch"), circulo = document.querySelector(".circulo"), menu = document.querySelector(".menu"), main = document.querySelector("main");

menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span) => {
            span.classList.add("oculto");
        });
    }
});
cloud.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });
});

function horaActual() {
    let fechaActual = new Date();
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const diaSemana = diasSemana[fechaActual.getDay()];
    let diaMes = fechaActual.getDate();
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let nombreMes = meses[fechaActual.getMonth()];
    let nombreAño = fechaActual.getFullYear();
    let resultado = `${diaSemana} ${diaMes} de ${nombreMes} de ${nombreAño}`;
    document.getElementById('FechaTiempo').textContent = resultado;
}
horaActual();
precargaIMG();
let contadorFondo = 0;
setInterval(() => {
    horaActual();
    contadorFondo++;
    if (contadorFondo % 2 == 0) {
        document.body.style.background = "url('../img/NuvesFondo.jpg') no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
    }
}, 12000);

function precargaIMG() {
    const urls = ['../img/NuvesFondo.jpg']; 
    const images = [];
    for (const url of urls) {
        const img = new Image();
        img.src = url;
        images.push(img);
    }
}
function diaSemana() {
    var fechaActual = new Date();

    fechaActual.setDate(fechaActual.getDate() + 1);
    var diaManana = fechaActual.getDay();

    fechaActual.setDate(fechaActual.getDate() + 1);
    var diaPasadoManana = fechaActual.getDay();

    fechaActual.setDate(fechaActual.getDate() + 1);
    var diaEnTresDias = fechaActual.getDay();

    var dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    var nombreDiaManana = dias[diaManana];
    var nombreDiaPasadoManana = dias[diaPasadoManana];
    var nombreDiaEnTresDias = dias[diaEnTresDias];

    document.getElementById('temperaturaManana2').innerHTML = nombreDiaManana;
    document.getElementById('temperaturaManana3').innerHTML = nombreDiaPasadoManana;
    document.getElementById('temperaturaManana4').innerHTML = nombreDiaEnTresDias;
    setInterval(diaSemana, 300000);
}
diaSemana();


