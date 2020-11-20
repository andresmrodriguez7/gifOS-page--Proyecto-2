let btnEmpezar = document.getElementById("btn-comenzar");
let video = document.getElementById("marco-video");
let btnTerminar = document.getElementById("btn-terminar");
let mostrarGif = document.getElementById("mostrarGif");
let btnGuardar = document.getElementById("btn-guardar");
let recorder = null;
let pathUpload = "https://upload.giphy.com/v1/gifs";
const apiKey = "3cqcb8LEg33MtM0vWp2nMTE6iMswMXML";


function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 7,
                quality: 10,
                width: 370,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            recorder.startRecording();
        })
        .catch(function (err) {
            console.log('error', err);
        });
}

btnEmpezar.addEventListener('click', () => {
    getStreamAndRecord();
    btnTerminar.style.display = "block";
    btnEmpezar.style.display = "none";
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
        // form.append('file', blob, 'myGif.gif');
        // console.log(form.get('file'));
    });
})