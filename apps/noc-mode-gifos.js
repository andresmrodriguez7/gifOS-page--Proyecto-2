let noche = document.getElementById("noc-mode");

noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos-gifos");
    hoja = estilo.href;

    if (hoja === "http://127.0.0.1:5500/styles-gifos-noc.css") {
        estilo.href = "http://127.0.0.1:5500/styles-gifos.css";

    } else if (hoja === "http://127.0.0.1:5500/styles-gifos.css") {
        estilo.href = "http://127.0.0.1:5500/styles-gifos-noc.css";

    }
})