let noche = document.getElementById("noc-mode");
let btnCrear = document.getElementById("btn-Crear");
let lupa = document.getElementById("lupa-close");
let logoHeader= document.getElementById("logoHeader");

btnCrear.addEventListener("mouseover", () => {
    btnCrear.src = "./imgs/CTA-crear-gifo-hover.svg";
});

btnCrear.addEventListener("mouseout", () => {
    btnCrear.src = "./imgs/button-crear-gifo.svg";
    btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
});

// funcion que setea el tema nocturno
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
        lupa.src="./imgs/icon-search.svg";
        logoHeader.src="./imgs/logo-desktop.svg";
    } else {
        setTheme("theme-dark");
        lupa.src="./imgs/icon-search-mod-noc.svg";
        logoHeader.src="./imgs/Logo-modo-noc.svg";
    }

});





// noche.addEventListener("click", (estilo) => {
//     estilo = document.getElementById("estilos");
//     hoja = estilo.href;


//     if (hoja === "http://127.0.0.1:5500/styles-noc.css") {
//         estilo.href = "http://127.0.0.1:5500/styles.css";
//         btnCrear.src = "./imgs/button-crear-gifo.svg";
//         lupa.src = "./imgs/icon-search.svg"

//     } else if (hoja === "http://127.0.0.1:5500/styles.css") {
//         estilo.href = "http://127.0.0.1:5500/styles-noc.css";
//         btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
//         lupa.src = "./imgs/icon-search-mod-noc.svg"

//     }
// })