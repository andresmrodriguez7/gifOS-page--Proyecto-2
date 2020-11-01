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


const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let pathTrending = "api.giphy.com/v1/gifs/trending";
let containerGif = document.getElementById("gifo-container");
let cantidad = 12;

async function buscarGifos(params) {
    const busqueda = buscador.value;
    let search = document.getElementById("search");
    search.innerHTML = `<b>${busqueda}</b>`
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=${cantidad}&offset=0&rating=g&lang=en`;
    let llamado = await fetch(path);
    console.log(llamado);
    let json = await llamado.json();
    console.log(json.data);
    containerGif.innerHTML = " ";
    for (let i = 0; i < json.data.length; i++) {
        const element = json.data[i];
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let user = element.username;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
        <div class="container-icon">
            <img src="./imgs/icon-download.svg" alt="icon" class="icon-gifo">
            <img src="./imgs/icon-fav.svg" alt="icon" class="icon-gifo">
            <img src="./imgs/icon-max-normal.svg" alt="icon" class="icon-gifo">
        </div>
        <div class="container-desc">
            <p class="gif-user">${user}</p>
            <p class="gif-title">T${gifoName}</p>
        </div>
    </div>
       <img class="gifo-trend" src="${src}" alt="">`
        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        containerGif.appendChild(card);
    }

}

let disparadorSearch = document.getElementById("lupa-izq");

disparadorSearch.addEventListener("click", () => {
    try {
        buscarGifos();
    } catch (error) {
        console.log(error);
    }
})

let vermas = document.getElementById("ver-mas");

vermas.addEventListener("click", () => {
    if (cantidad < 24) {
        cantidad += 4;
        try {
            buscarGifos();
        } catch (error) {
            console.log(error);
        }
    } else if (cantidad = 24) {
        vermas.innerHTML = `<p>ver menos</p>`
        cantidad = 12;
        try {
            buscarGifos();
        } catch (error) {
            console.log(error);
        }
    }
})