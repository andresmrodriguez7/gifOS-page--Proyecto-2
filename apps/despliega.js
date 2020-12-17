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
let gifExtend = document.getElementById("gif-selected");
let titleExtend = document.getElementById("titleExtend");
let favorites = [];
let lSlider = document.getElementById("left-slider");
let rSlider = document.getElementById("right-slider");


// en esta funcion se piden las sugerencias del buscador y nos suscribimos a los eventos que permiten usar dichas sugerencias
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
// en esta funcion extraemos los id de gif para enviarlos a favoritos


// en esta función solicitamos el gif especifico que el usuario quiere expandir
async function llamaGifExtend(params) {
    let id = params;
    const path = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    gifExtend.src = json.data[0].images.fixed_width.url;
    titleExtend.innerHTML = json.data[0].title;
}

// este servicio solicita los 12 gifos iniciales de una busqueda convencional
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
        let download = element.bitly_url;
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let user = element.username;
        let id = element.id;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
        <div class="container-icon">
        <a href="${download}" target="_blank" class="icon-gifo down"> <img id="${id}" src="./imgs/icon-download.svg" alt="icon"></a>
            <img id="${id}" src="./imgs/icon-fav.svg" alt="icon" class="icon-gifo fav">
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

    // aqui me suscribo a los eventos para extender y seleccionar favoritos
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
            gifExtend.src = "./imgs/Loading.gif";
        })
    }

    guardarFavorito();

}

// esta función busca los gif en tendencia y se actualizan siempre al cargar la pagina
async function buscarTendencia() {
    const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6&rating=g`;
    let llamado = await fetch(path);
    let json2 = await llamado.json();

    for (let i = 0; i < json2.data.length; i++) {
        const element = json2.data[i];
        let src = element.images.fixed_width.url;
        let gifoName = element.title;
        let download = element.bitly_url;
        let user = element.username;
        let id = element.id;
        let card = document.createElement("div");
        card.className = "card-gifo-carousel"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
        <div class="container-icon">
        <a href="${download}" target="_blank" > <img id="${id}" src="./imgs/icon-download.svg" alt="icon" class="icon-gifo down"></a>
            <img id="${id}" src="./imgs/icon-fav.svg" alt="icon" class="icon-gifo fav">
            <img  id="${id}" src="./imgs/icon-max-normal.svg" alt="icon" class="icon-gifo extend">
        </div>
        <div class="container-desc">
            <p class="gif-user">${user}</p>
            <p class="gif-title">${gifoName}</p>
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
                gifExtend.src = "./imgs/Loading.gif";
            })
        }
    }
    guardarFavorito();
}

// esta funcion guarda un gif como favorito
function guardarFavorito() {
    let favIcon = document.getElementsByClassName("icon-gifo fav");
    for (let i = 0; i < favIcon.length; i++) {
        const element = favIcon[i];
        if (localStorage.getItem("favoritos", JSON.stringify(favorites))) {
            favorites = JSON.parse(localStorage.getItem("favoritos"));
        }
        element.addEventListener("click", () => {
            let idFav = (event.target.id);
            if (element.src === "./imgs/icon-fav-active.svg") {
                alert("Ya has guardado este gif como favorito");
            } else {
                favorites.push(idFav);
            }
            element.src = "./imgs/icon-fav-active.svg";
            localStorage.setItem("favoritos", JSON.stringify(favorites))

        })
    }
}

// esta función coloca los terminos obtenidos en la primera con mayuscula
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// esta funcion busca los terminos o tag en tendencia
async function buscaTrending() {
    const path = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    let llamado = await fetch(path);
    let json3 = await llamado.json();
    for (let i = 0; i <= 5; i++) {
        const element = json3.data[i];
        let trend = capitalize(element);
        let option = document.createElement("span");
        option.className = "trend-tags";
        if (i < 5) {
            option.innerHTML = `${trend}, `
        } else {
            option.innerHTML = `${trend}  `

        }
        trends.appendChild(option);
        option.addEventListener("click", () => {
            buscador.value = option.innerHTML.slice(0, -2);
            buscarGifos();
        })

    }
}

// aqui se le pone hover a los sliders
lSlider.addEventListener('mouseover', () => {
    lSlider.src = "./imgs/button-slider-left-hover.svg"
});
lSlider.addEventListener('mouseout', () => {
    lSlider.src = "./imgs/button-slider-left.svg"
});
rSlider.addEventListener('mouseover', () => {
    rSlider.src = "./imgs/button-slider-right-hover.svg"
});
rSlider.addEventListener('mouseout', () => {
    rSlider.src = "./imgs/button-slider-right.svg"
});

// aqui se le hace slider con los botones
lSlider.addEventListener('click', function leftSlider() {
    tendencia.scrollLeft -= 510;
});
rSlider.addEventListener('click', function rightSlider() {
    tendencia.scrollLeft += 510;
});

// aqui se actualizan los gifos en tendencia
window.onload = buscarTendencia();
// aqui se actualizan los tags en tendencia
window.onload = buscaTrending();


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