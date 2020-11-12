let noche = document.getElementById("noc-mode");
let btnCrear = document.getElementById("btn-Crear");

btnCrear.addEventListener("mouseover", () => {

    btnCrear.src = "./imgs/CTA-crear-gifo-hover.svg";
});

btnCrear.addEventListener("mouseout", () => {
    btnCrear.src = "./imgs/button-crear-gifo.svg";
    btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
});



noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos");
    hoja = estilo.href;

    if (hoja === "http://127.0.0.1:5500/styles-noc.css") {
        estilo.href = "http://127.0.0.1:5500/styles.css";
        btnCrear.src = "./imgs/button-crear-gifo.svg";

    } else if (hoja === "http://127.0.0.1:5500/styles.css") {
        estilo.href = "http://127.0.0.1:5500/styles-noc.css";
        btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"

    }
})