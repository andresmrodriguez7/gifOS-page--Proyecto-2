let noche = document.getElementById("noc-mode");
let btnCrear = document.getElementById("btn-Crear");
let lupa = document.getElementById("lupa-close");
let logoHeader = document.getElementById("logoHeader");
let iconFace = document.getElementById("media-face");
let iconTwit = document.getElementById("media-twit");
let iconInsta = document.getElementById("media-insta");
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
        logoHeader.src = "./imgs/Logo-modo-noc.svg";
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


    if (tema === "theme-dark") {
        setTheme("theme-light");
        logoHeader.src = "./imgs/logo-desktop.svg";
    } else {
        setTheme("theme-dark");
        logoHeader.src = "./imgs/Logo-modo-noc.svg";
    }
});

iconFace.addEventListener("mouseover", () => {
    iconFace.src = "./imgs/icon_facebook_hover.svg";
});

iconFace.addEventListener("mouseout", () => {
    iconFace.src = "./imgs/icon_facebook.svg";
});

iconTwit.addEventListener("mouseover", () => {
    iconTwit.src = "./imgs/icon-twitter-hover.svg";
});

iconTwit.addEventListener("mouseout", () => {
    iconTwit.src = "./imgs/icon-twitter.svg";
});

iconInsta.addEventListener("mouseover", () => {
    iconInsta.src = "./imgs/icon_instagram-hover.svg";
});

iconInsta.addEventListener("mouseout", () => {
    iconInsta.src = "./imgs/icon_instagram.svg";
});