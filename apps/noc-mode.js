let noche = document.getElementById("noc-mode");
let estilo;
let estiloFav;
let estiloCrear;
let estiloGifos;
noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos").href = "styles-noc.css";
    estiloFav = document.getElementById("estilos-fav").href = "styles-fav-noc.css";
    estiloCrear = document.getElementById("estilos-gifos").href = "styles-gifos-noc.css";
    estiloGifos = document.getElementById("estilos-crear").href = "styles-crear-noc.css";
})
noche.addEventListener("dblclick", (estilo) => {
    estilo = document.getElementById("estilos").href = "styles.css";
    estiloFav = document.getElementById("estilos-fav").href = "styles-fav.css";
    estiloCrear = document.getElementById("estilos-gifos").href = "styles-gifos.css";
    estiloGifos = document.getElementById("estilos-crear").href = "styles-crear.css";
})