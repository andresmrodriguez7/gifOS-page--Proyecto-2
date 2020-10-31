let buscador = document.getElementById("buscar-top");
let cerrar = document.getElementById("menu-close");
let cont = document.getElementById("prueba");
let lupaIzq = document.getElementById("lupa-izq");
let lupaDer = document.getElementById("lupa-der");

buscador.addEventListener("keydown", (contenedor) => {
    cerrar.style.display = 'block';
    lupaDer.style.display = 'none';
    lupaIzq.style.display = 'block';
    cont.innerHTML = " ";
    contenedor = document.createElement("div");
    contenedor.id = "opciones";
    contenedor.className = "opciones";
    contenedor.innerHTML = ` <hr>
    <p><img src="./imgs/icon-search.svg" alt="buscar" class="lupa"><label for="">Sugerencia 1</label></p>
    <p><img src="./imgs/icon-search.svg" alt="buscar" class="lupa"><label for="">Sugerencia 2</label></p>
    <p><img src="./imgs/icon-search.svg" alt="buscar" class="lupa"><label for="">Sugerencia 3</label></p>
    <p><img src="./imgs/icon-search.svg" alt="buscar" class="lupa"><label for="">Sugerencia 4</label></p>`
    cont.appendChild(contenedor);
})
cerrar.addEventListener("click", () => {
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";
    buscador.value = "";
    cerrar.style.display = 'none';
    lupaDer.style.display = 'block';
    lupaIzq.style.display = 'none';
})
buscador.addEventListener("blur", () => {
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";

})
let gifo = document.getElementById("card-gifo");
let select = document.getElementById("container-hover");

gifo.addEventListener("mouseover", () => {
    select.style.display = "flex";
})
gifo.addEventListener("mouseout", () => {
    select.style.display = "none";
})