let btnEmpezar = document.getElementById("btn-comenzar");
let video = document.getElementById("marco-video");
let recorder = null;


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
                width: 480,
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
    getStreamAndRecord();
});

btnTerminar.addEventListener('click', () => {
    recorder.stopRecording(() => {
        let blob = recorder.getBlob();
        var uri = URL.createObjectURL(blob);
        mostrarGif.src = uri;
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
    });
})