$("#porcentajeLluvia, #porcentajeBruma, #porcentajeBrisa").on("dragstart", function(event) {
    event.originalEvent.dataTransfer.setData("text/plain", event.target.id); 
});

$("#destino, #destinoInicio").on('dragover', function(event) {
    event.preventDefault();
});

$("#destino, #destinoInicio").on('drop', function(event) {
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData("text/plain");
    console.log(data);
    
    var id = data.substring(data.lastIndexOf('/') + 1); 

    var imgSrc = "/img/" + id;
    var imgAlt = $("#" + id).attr("alt");
    
    var img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;

    var p = document.createElement("p");
    p.id = "p_" + id; 
    p.textContent = "";

    var destino = event.target;
    destino.appendChild(img);
    destino.appendChild(p);
});
