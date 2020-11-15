// let noche = document.getElementById("noc-mode");

// noche.addEventListener("click", (estilo) => {
//     estilo = document.getElementById("estilos-crear");
//     hoja = estilo.href;

//     if (hoja === "http://127.0.0.1:5500/styles-crear-noc.css") {
//         estilo.href = "http://127.0.0.1:5500/styles-crear.css";

//     } else if (hoja === "http://127.0.0.1:5500/styles-crear.css") {
//         estilo.href = "http://127.0.0.1:5500/styles-crear-noc.css";

//     }
// })

let noche = document.getElementById("noc-mode");
let btnCrear = document.getElementById("btn-Crear");
let lupa = document.getElementById("lupa-close");

btnCrear.addEventListener("mouseover", () => {
    btnCrear.src = "./imgs/CTA-crear-gifo-hover.svg";
});

btnCrear.addEventListener("mouseout", () => {
    btnCrear.src = "./imgs/button-crear-gifo.svg";
    btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
});

// función que setea el tema nocturno
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}
// intercambia los temas y los guarda localmente

// para la primera carga de pagina verificamos el ultimo tema usado y luego lo cargamos
(function() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();

noche.addEventListener("click", function toggleTheme() {
    let tema = localStorage.getItem("theme");
    console.log(tema);
    console.log("aqui");
    if (tema === "theme-dark") {
        setTheme("theme-light");
    } else {
        setTheme("theme-dark");
    }
});