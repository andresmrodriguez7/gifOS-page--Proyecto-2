let noche = document.getElementById("noc-mode");

noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos-crear");
    hoja = estilo.href;

    if (hoja === "http://127.0.0.1:5500/styles-crear-noc.css") {
        estilo.href = "http://127.0.0.1:5500/styles-crear.css";

    } else if (hoja === "http://127.0.0.1:5500/styles-crear.css") {
        estilo.href = "http://127.0.0.1:5500/styles-crear-noc.css";

    }
})