let noche = document.getElementById("noc-mode");

noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos");
    hoja = estilo.href;

    if (hoja === "http://127.0.0.1:5500/styles-noc.css") {
        estilo.href = "http://127.0.0.1:5500/styles.css";

    } else if (hoja === "http://127.0.0.1:5500/styles.css") {
        estilo.href = "http://127.0.0.1:5500/styles-noc.css";

    }
})