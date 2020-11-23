let noche = document.getElementById("noc-mode");
let btnCrear = document.getElementById("btn-Crear");
let lupa = document.getElementById("lupa-close");
let logoHeader = document.getElementById("logoHeader");



// funcion que setea el tema nocturno
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}
// intercambia los temas y los guarda localmente

// para la primera carga de pagina verificamos el ultimo tema usado y luego lo cargamos
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        logoHeader.src = "./imgs/Logo-modo-noc.svg";
        lupa.src = "./imgs/icon-search-mod-noc.svg";
        btnCrear.src = "./imgs/CTA-crar-gifo-modo-noc.svg";
        btnCrear.addEventListener("mouseover", () => {
            btnCrear.src = "./imgs/CTA-crear-gifo-hover.svg";
        });

        btnCrear.addEventListener("mouseout", () => {
            btnCrear.src = "./imgs/CTA-crar-gifo-modo-noc.svg"
        });
        btnCrear.addEventListener("click", () => {
            btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
        })
    } else {
        setTheme('theme-light');
        logoHeader.src = "./imgs/logo-desktop.svg";
        lupa.src = "./imgs/icon-search.svg";
        btnCrear.src = "./imgs/button-crear-gifo.svg";
        btnCrear.addEventListener("mouseover", () => {
            btnCrear.src = "./imgs/CTA-crear-gifo-hover.svg";
        });

        btnCrear.addEventListener("mouseout", () => {
            btnCrear.src = "./imgs/button-crear-gifo.svg";
            
        });
        btnCrear.addEventListener("click", () => {
            btnCrear.src = "./imgs/CTA-crear-gifo-active.svg"
        })
    }
})();

noche.addEventListener("click", function toggleTheme() {
    let tema = localStorage.getItem("theme");
    console.log(tema);
    console.log("aqui");
    if (tema === "theme-dark") {
        setTheme("theme-light");
        lupa.src = "./imgs/icon-search.svg";
        logoHeader.src = "./imgs/logo-desktop.svg";
        btnCrear.src = "./imgs/button-crear-gifo.svg";
    } else {
        setTheme("theme-dark");
        lupa.src = "./imgs/icon-search-mod-noc.svg";
        logoHeader.src = "./imgs/Logo-modo-noc.svg";
        btnCrear.src = "./imgs/CTA-crar-gifo-modo-noc.svg"
    }
});
