var gifContainer = document.getElementById("gifo-container-own");
// const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";




// con esta funcion consultamos el localstorage y mostramos los gif guardados
async function muestraMisGif() {
    gifContainer.innerHTML = "";
    let misGIFOS = JSON.parse(localStorage.getItem("misGifos"));
    // verificamos si hay algun gif guardado para poner icono
    if (misGIFOS === null) {
        let image = document.getElementById("carita");
        image.src = "./imgs/icon-mis-gifos-sin-contenido.svg";
        image.style.width = "80px"
        image.style.height = "80px"
    }
    console.log(misGIFOS);
    for (let i = 0; i < misGIFOS.length; i++) {
        const element = misGIFOS[i];
        const path = `https://api.giphy.com/v1/gifs?api_key=3cqcb8LEg33MtM0vWp2nMTE6iMswMXML&ids=${element}`;
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
            <img id="${id}" src="./imgs/icon-trash-normal.svg" alt="icon" class="icon-gifo fav">
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
        gifContainer.appendChild(card);
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
        // let unselect = document.getElementsByClassName("icon-gifo fav");
        // console.log(unselect);
        // for (let i = 0; i < unselect.length; i++) {
        //     const element = unselect[i];
        //     element.addEventListener("click", () => {
        //         let id = event.target.id;
        //         eliminarFav(id);
        //         console.log(`aqui`);
        //         console.log(id);
        //     })
        // }
    }
}

async function llamaGifExtend(params) {
    let id = params;
    const path = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    gifExtend.src = json.data[0].images.fixed_width.url;
    titleExtend.innerHTML = json.data[0].title;
}

window.onload = muestraMisGif();