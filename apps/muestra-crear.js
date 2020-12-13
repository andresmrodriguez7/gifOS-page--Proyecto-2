let modalExit = document.getElementById("modal-close");
let gifExtend = document.getElementById("gif-selected");
let lSlider = document.getElementById("left-slider");
let rSlider = document.getElementById("right-slider");
let tendencia = document.getElementById("gifos");
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";

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

function eliminarFav(id) {
    let favGuardados = JSON.parse(localStorage.getItem("favoritos"));
    let index = favGuardados.indexOf(id);
    console.log(favGuardados);
    favGuardados.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(favGuardados));
    muestraFavoritos();
}


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
            <img id="${id}" src="./imgs/icon-max-normal.svg" alt="icon" class="icon-gifo extend">
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