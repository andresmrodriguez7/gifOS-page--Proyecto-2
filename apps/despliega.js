let buscador = document.getElementById("buscar-top");
let cerrar = document.getElementById("menu-close");
let cont = document.getElementById("prueba");
let lupaIzq = document.getElementById("lupa-izq");
let lupaDer = document.getElementById("lupa-close");
let vermas = document.getElementById("ver-mas");
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let pathTrending = "api.giphy.com/v1/gifs/trending";
let containerGif = document.getElementById("gifo-container");
let cantidad = 12;
let tendencia = document.getElementById("gifos");

async function llamaSugerencias() {
    const busqueda = buscador.value;
    console.log(busqueda);
    const path = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${busqueda}&limit=4&offset=0&rating=g&lang=en`;
    console.log(path);
    let llamado = await fetch(path);
    let json1 = await llamado.json();
    console.log(json1.data);
    cont.innerHTML = " ";
    contenedor = document.createElement("div");
    contenedor.id = "opciones";
    contenedor.className = "opciones";
    contenedor.innerHTML = `<hr>`;
    for (let i = 0; i < json1.data.length; i++) {
        const element = json1.data[i];
        let sugerencia = document.createElement("p");
        sugerencia.innerHTML = `<img src="./imgs/icon-search.svg" alt="buscar" class="lupa"><label for="">${element.name}</label>`
        contenedor.appendChild(sugerencia);
    }
    cont.appendChild(contenedor);
}

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
        vermas.style.display = "block";
    }
}

async function buscarTendencia() {
    const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6&rating=g`;
    let llamado = await fetch(path);
    let json2 = await llamado.json();
    console.log(json2);
    for (let i = 0; i < json2.data.length; i++) {
        const element = json2.data[i];
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let user = element.username;
        let card = document.createElement("div");
        card.className = "card-gifo-carousel"
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
       <img class="gifo-trend" src="${src}" alt="gif-tendencia">`
        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        tendencia.appendChild(card);
    }

}

buscarTendencia();

// Aqui desplegamos las opciones y jugamos con los iconos de busqueda
buscador.addEventListener("keyup", (contenedor) => {
    lupaDer.src = "./imgs/close.svg";
    lupaDer.style.width = '18px';
    lupaDer.style.height = '18px';
    lupaIzq.style.display = "block";
    cont.innerHTML = " ";
    llamaSugerencias();

})

// aqui borramos lo escrito en el buscador 
lupaDer.addEventListener("click", () => {
    buscador.value = "";
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";
    lupaDer.src = "./imgs/close.svg" ? lupaDer.src = "./imgs/icon-search.svg" : lupaDer.src = "./imgs/close.svg";
    lupaDer.style.width = '23px';
    lupaDer.style.height = '23px';
    lupaIzq.style.display = 'none';
})
buscador.addEventListener("blur", () => {
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";

})

// aqui disparamos la busqueda al ir escribiendo 
buscador.addEventListener("keyup", () => {
    try {
        buscarGifos();
    } catch (error) {
        console.log(error);
    }
})

// aqui ejecutamos el boton ver más
let gifoContainer = document.getElementById("gifo-comtainer");
vermas.addEventListener("click", () => {
    if (cantidad < 24) {
        cantidad += 4;
        try {
            buscarGifos();
            if (cantidad === 24) {
                vermas.innerHTML = `<p>ver menos</p>`
            }
        } catch (error) {
            alert("Hemos detectado el siguiente error en el servidor: ", error);
        }
    } else if (cantidad = 24) {
        cantidad = 12;
        vermas.innerHTML = `<p>ver más</p>`
        try {
            buscarGifos();
        } catch (error) {
            alert("Hemos detectado el siguiente error en el servidor: ", error);
        }
    }
})