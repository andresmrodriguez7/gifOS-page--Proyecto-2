let btnEmpezar = document.getElementById("btn-comenzar");
let video = document.getElementById("marco-video");
let btnTerminar = document.getElementById("btn-terminar");
let btnGrabar = document.getElementById("btn-grabar");
let mostrarGif = document.getElementById("mostrarGif");
let btnGuardar = document.getElementById("btn-guardar");
let descript = document.getElementById("video-startup");
let permisos = document.getElementById("permisos");
let recorder = null;
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let pathUpload = "https://upload.giphy.com/v1/gifs?api_key=3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";
let misGIFOS = [];
let form = new FormData();


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
});

btnGrabar.addEventListener('click', () => {
    getStreamAndRecord();
    btnTerminar.style.display = "block";
    btnGrabar.style.display = "none";
    descript.style.display = "none";
    permisos.style.display = "none";

});

btnTerminar.addEventListener('click', () => {
    recorder.stopRecording(() => {
        let blob = recorder.getBlob();
        var uri = URL.createObjectURL(blob);
        console.log(uri);
        video.style.display = "none";
        mostrarGif.style.display = "block";
        mostrarGif.src = uri;
        btnTerminar.style.display = "none";
        btnGuardar.style.display = "block";
        form.append('file', blob, 'myGif.gif');
    });
})

btnGuardar.addEventListener('click', () => {
    let idGifoCreado = createGif(form);
    misGIFOS.push(idGifoCreado);
    console.log(misGIFOS);
    localStorage.setItem("misGifos", misGIFOS);

});

async function createGif(formdata) {
    const response = await fetch(pathUpload, {
        method: 'POST',
        body: formdata,
        // mode: "no-cors"
    });
    console.log(response);
    const json = await response.json();
    console.log(JSON.stringify(json));
    let id = json.data.id;
    return id;
}