const cloud=document.getElementById("cloud"),barraLateral=document.querySelector(".barra-lateral"),spans=document.querySelectorAll("span"),palanca=document.querySelector(".switch"),circulo=document.querySelector(".circulo"),menu=document.querySelector(".menu"),main=document.querySelector("main");

menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral");
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display="none";
        menu.children[1].style.display="block";
    }else{
        menu.children[0].style.display="block";
        menu.children[1].style.display="none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        });
    }
});
cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});

function horaActual(){
    let fechaActual=new Date();
    const diasSemana=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const diaSemana=diasSemana[fechaActual.getDay()];
    let diaMes=fechaActual.getDate();
    const meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    let nombreMes=meses[fechaActual.getMonth()];
    let nombreAño=fechaActual.getFullYear();
    let resultado=`${diaSemana} ${diaMes} de ${nombreMes} de ${nombreAño}`;
    document.getElementById('FechaTiempo').textContent=resultado;
}
horaActual();
let contadorFondo=0;
setInterval(()=>{
    horaActual();
    contadorFondo++;
    if(contadorFondo%2==0){
        document.body.style.background="url('../img/NuvesFondo.jpg') no-repeat";
        document.body.style.backgroundSize="cover";
        document.body.style.backgroundAttachment="fixed";
    }
},12000);
