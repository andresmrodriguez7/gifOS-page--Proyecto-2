var favContainer = document.getElementById("gifo-container-fav");
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let tendencia = document.getElementById("gifos");
let modalExit = document.getElementById("modal-close");
let gifExtend = document.getElementById("gif-selected");

// con esta funcion consultamos el localstorage y mostramos los gif guardados
async function muestraFavoritos(params) {
    let favorites = JSON.parse(localStorage.getItem("favoritos"));
    // verificamos si hay algun gif guardado para poner icono
    if (favorites === null) {
        let image = document.getElementById("corazoncito");
        image.src = "./imgs/icon-fav-sin-contenido.svg";
        image.style.width = "80px"
        image.style.height = "80px"
    }
    console.log(favorites);
    for (let i = 0; i < favorites.length; i++) {
        const element = favorites[i];
        const path = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${element}`;
        let llamado = await fetch(path);
        let json = await llamado.json();
                let elemento = json.data[0];
        let src = elemento.images.fixed_width.url;
        let gifoName = elemento.title;
        let user = elemento.username;
        let id = elemento.id;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = `<div id="container-hover" class="container-hover">
        <div class="container-icon">
            <img id="${id}" src="./imgs/icon-download.svg" alt="icon" class="icon-gifo down">
            <img id="${id}" src="./imgs/icon-fav-active.svg" alt="icon" class="icon-gifo fav">
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
        favContainer.appendChild(card);
    }
}

window.onload = muestraFavoritos();

async function llamaGifExtend(params) {
    let id = params;
    const path = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    gifExtend.src = json.data[0].images.fixed_width.url;
    titleExtend.innerHTML = json.data[0].title;
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
            <img id="${id}" src="./imgs/icon-download.svg" alt="icon" class="icon-gifo">
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
}
window.onload = buscarTendencia();