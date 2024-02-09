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
        parrafo.innerHTML = "22KM/H";
        textoDrag.appendChild(draggedElement);
        textoDrag.appendChild(parrafo);
        event.target.appendChild(textoDrag);
    }
});