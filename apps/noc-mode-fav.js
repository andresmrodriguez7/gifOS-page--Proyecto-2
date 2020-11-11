let noche = document.getElementById("noc-mode");

noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos-fav");
    hoja = estilo.href;

    if (hoja === "http://127.0.0.1:5500/styles-fav-noc.css") {
        estilo.href = "http://127.0.0.1:5500/styles-fav.css";

    } else if (hoja === "http://127.0.0.1:5500/styles-fav.css") {
        estilo.href = "http://127.0.0.1:5500/styles-fav-noc.css";

    }
})