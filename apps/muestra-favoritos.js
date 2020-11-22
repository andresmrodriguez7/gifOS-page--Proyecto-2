var favContainer = document.getElementById("gifo-container-fav");
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";

async function muestraFavoritos(params) {
    let favorites = JSON.parse(localStorage.getItem("favoritos"));
    console.log(favorites);
       for (let i = 0; i < favorites.length; i++) {
        const element = favorites[i];
        const path = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${element}`;
        let llamado = await fetch(path);
        let json = await llamado.json();
        let elemento=json.data[0];
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