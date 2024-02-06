// Lista de URLs de imágenes a precargar
var imageUrls = [
    "../img/NuvesFondo.jpg","../img/FondoRegister.jpg"
    // Agrega más URLs de imágenes si es necesario
];

// Función para precargar las imágenes
function preloadImages(urls) {
    var images = [];
    for (var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.src = urls[i];
        images.push(img);
    }
    return images;
}
preloadImages(imageUrls);
