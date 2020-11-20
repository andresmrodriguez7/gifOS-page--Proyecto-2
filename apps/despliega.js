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
let trends = document.getElementById("trends");
let modal = document.getElementById("modal")
let modalExit = document.getElementById("modal-close");
let gifExtend = document.getElementById("gif-selected")

async function llamaSugerencias() {
    const busqueda = buscador.value;
    const path = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${busqueda}&limit=4&offset=0&rating=g&lang=en`;
    let llamado = await fetch(path);
    let json1 = await llamado.json();
    cont.innerHTML = " ";
    contenedor = document.createElement("div");
    contenedor.id = "opciones";
    contenedor.className = "opciones";
    contenedor.innerHTML = `<hr>`;
    for (let i = 0; i < json1.data.length; i++) {
        const element = json1.data[i];
        let id = i;
        let sugerencia = document.createElement("p");
        sugerencia.className = "suggestion"
        sugerencia.innerHTML = `<img src="./imgs/icon-search.svg" alt="buscar" name="${id}" class="lupa"><label class="suggest" for="${id}">${element.name}</label>`
        contenedor.appendChild(sugerencia);
    }
    cont.appendChild(contenedor);
    let select = document.getElementsByClassName("suggest");
    for (let i = 0; i < select.length; i++) {
        const element = select[i];
        element.addEventListener("mouseover", () => {
            event.target.style.color = "#0078d7";
        })
        element.addEventListener("mouseout", () => {
            if (localStorage.getItem('theme') === 'theme-light') {
                event.target.style.color = "#572ee5";
            } else {
                event.target.style.color = "white";
            }
        })
        element.addEventListener("click", () => {
            buscador.value = element.innerHTML;
            buscarGifos();
            contenedor.innerHTML = " ";
        })
    }
}
async function llamaGifExtend(params) {
    let id = params;
    const path = `https://api.giphy.com/v1/gifs/?gif_id=${id}&api_key=3cqcb8LEg33MtM0vWp2nMTE6iMswMXML`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    gifExtend.src = json.data.images.fixed_width.url;
}

async function buscarGifos(params) {
    const busqueda = buscador.value;
    let search = document.getElementById("search");
    search.innerHTML = `<b>${busqueda}</b>`
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&limit=${cantidad}&offset=0&rating=g&lang=en`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    containerGif.innerHTML = " ";
    for (let i = 0; i < json.data.length; i++) {
        const element = json.data[i];
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let user = element.username;
        let id = element.id;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
        <div class="container-icon">
            <img src="./imgs/icon-download.svg" alt="icon" class="icon-gifo down">
            <img src="./imgs/icon-fav.svg" alt="icon" class="icon-gifo fav">
            <img  id="${id}" src="./imgs/icon-max-normal.svg" alt="icon" class="icon-gifo extend">
        </div>
        <div class="container-desc">
            <p class="gif-user">${user}</p>
            <p class="gif-title">${gifoName}</p>
        </div>
    </div>
       <img id="${id}" class="gifo-trend" src="${src}" alt="${gifoName}">`
        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        containerGif.appendChild(card);
        vermas.style.display = "block";
    }
    let extendIcon = document.getElementsByClassName("icon-gifo extend");
    for (let i = 0; i < extendIcon.length; i++) {
        const element = extendIcon[i];
        element.addEventListener("click", () => {
            modal.style.display = "block";
            let id = event.target.id;
            llamaGifExtend(id);
        })
        modalExit.addEventListener("click", () => {
            modal.style.display = "none";
        })

    }

}

async function buscarTendencia() {
    const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6&rating=g`;
    let llamado = await fetch(path);
    let json2 = await llamado.json();

    for (let i = 0; i < json2.data.length; i++) {
        const element = json2.data[i];
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let user = element.username;
        let id = element.id;
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
       <img id="${id}" class="gifo-trend" src="${src}" alt="gif-tendencia">`
        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        tendencia.appendChild(card);
    }
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

async function buscaTrending() {
    const path = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    let llamado = await fetch(path);
    let json3 = await llamado.json();
    console.log(json3.data);
    for (let i = 0; i <= 5; i++) {
        const element = json3.data[i];
        let trend = capitalize(element);
        console.log(trend);
        let option = document.createElement("span");
        option.innerHTML = ` ${trend},`
        trends.appendChild(option);
    }
}
window.onload = buscaTrending();
// aqui se actualizan los gifos en tendencia
window.onload = buscarTendencia();

// Aqui desplegamos las opciones y jugamos con los iconos de busqueda
buscador.addEventListener("keyup", (contenedor) => {
    lupaDer.src = "./imgs/close.svg";
    lupaDer.style.width = '18px';
    lupaDer.style.height = '18px';
    lupaIzq.style.display = "block";
    cont.innerHTML = " ";
    cont.style.display = "block";
    llamaSugerencias();

})
let brand = document.getElementById("brand");
let results = document.getElementById("results");
buscador.addEventListener("focusin", () => {
    brand.style.display = "none";
    containerGif.style.display = "flex";
    results.style.display = "block";
})

// aqui borramos lo escrito en el buscador 
lupaDer.addEventListener("click", () => {
    buscador.value = "";
    brand.style.display = "block";
    results.style.display = "none";
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";
    lupaDer.src = "./imgs/close.svg" ? lupaDer.src = "./imgs/icon-search.svg" : lupaDer.src = "./imgs/close.svg";
    lupaDer.style.width = '23px';
    lupaDer.style.height = '23px';
    lupaIzq.style.display = 'none';

})

buscador.addEventListener("blur", () => {
    setTimeout(() => {
        contenedor = document.getElementById("opciones");
        contenedor.innerHTML = " ";
    }, 1000);

})

// aqui disparamos la busqueda al ir escribiendo 
buscador.addEventListener("keyup", () => {
    try {
        buscarGifos();
    } catch (error) {
        alert("Hemos detectado el siguiente error en el servidor: ", error);
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