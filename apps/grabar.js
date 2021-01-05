let btnEmpezar = document.getElementById("btn-comenzar");
let video = document.getElementById("marco-video");
let btnTerminar = document.getElementById("btn-terminar");
let btnGrabar = document.getElementById("btn-grabar");
let mostrarGif = document.getElementById("mostrarGif");
let btnGuardar = document.getElementById("btn-guardar");
let descript = document.getElementById("video-startup");
let permisos = document.getElementById("permisos");
let subiendo = document.getElementById("subiendo");
let subido = document.getElementById("subido");

let recorder = null;
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let pathUpload = "https://upload.giphy.com/v1/gifs?api_key=3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let misGIFOS = null;
let form = new FormData();
let step1 = document.getElementById("paso1");
let step2 = document.getElementById("paso2");
let step3 = document.getElementById("paso3");



function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 370,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log('started')
                },
            });
            recorder.startRecording();
        })
        .catch(function(err) {
            console.log('error', err);
        });
}

btnEmpezar.addEventListener('click', () => {
    btnGrabar.style.display = "block";
    btnEmpezar.style.display = "none";
    descript.style.display = "none";
    permisos.style.display = "block";
    step1.style.backgroundColor = "#572ee5";
    step1.style.color = "white";
});

btnGrabar.addEventListener('click', () => {
    getStreamAndRecord();
    btnTerminar.style.display = "block";
    btnGrabar.style.display = "none";
    descript.style.display = "none";
    permisos.style.display = "none";
    step2.style.backgroundColor = "#572ee5";
    step2.style.color = "white";
    step1.style.backgroundColor = "transparent";
    step1.style.color = "#572ee5";

});

btnTerminar.addEventListener('click', () => {
    recorder.stopRecording(() => {
        let blob = recorder.getBlob();
        var uri = URL.createObjectURL(blob);
        console.log(uri);
        video.style.display = "none";
        mostrarGif.style.display = "flex";
        mostrarGif.src = uri;
        btnTerminar.style.display = "none";
        btnGuardar.style.display = "block";
        form.append('file', blob, 'myGif.gif');
    });
    step3.style.backgroundColor = "#572ee5";
    step3.style.color = "white";
    step2.style.backgroundColor = "transparent";
    step2.style.color = "#572ee5";
})

btnGuardar.addEventListener('click', () => {
    subiendo.style.display = "flex";
    btnGuardar.innerHTML = '<img src="./imgs/loader.svg" alt="loading">';
    createGif(form);
});

async function createGif(formdata) {
    const response = await fetch(pathUpload, {
        method: 'POST',
        body: formdata,
        // mode: "no-cors"
    });
    const json = await response.json();
    // let id = JSON.stringify(json.data.id);
    subiendo.style.display = "none";
    subido.style.display = "flex";
    btnGuardar.innerHTML = '<a href="./misGifos.html"><p>¡Listo!</p></a>'
    let id = json.data.id;
    console.log(id);
    misGIFOS = JSON.parse(localStorage.getItem("misGifos"));
    if (misGIFOS === null) {
        misGIFOS = [];
        misGIFOS.push(id);
        console.log(misGIFOS);
        localStorage.setItem("misGifos", JSON.stringify(misGIFOS));
    } else {
        misGIFOS.push(id);
        console.log(misGIFOS);
        localStorage.setItem("misGifos", JSON.stringify(misGIFOS));
    }
}