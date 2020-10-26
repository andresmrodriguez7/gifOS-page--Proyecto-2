console.log("aqui");
let noche = document.getElementById("noc-mode");
console.log(noche);
let estilo;
noche.addEventListener("click", (estilo) => {
    estilo = document.getElementById("estilos").href = "styles-noc.css";
})
noche.addEventListener("dblclick", (estilo) => {
    estilo = document.getElementById("estilos").href = "styles.css";
})