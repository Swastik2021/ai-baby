video = "";
dstatus = "";
object = [];
object_name = 
function preload() {

}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}



function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    object_name = "person";
}

function modelloaded() {
    console.log('model loaded');
    dstatus = true;
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    object = result;
}
function draw() {
    image(video, 0, 0, 620, 420);
    if (dstatus != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            fill("#0000FF");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke('#0000FF');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == object_name) {
                 
                objectDetector.detect(gotResult);
                 document.getElementById("status").innerHTML =  "Baby Found";
                 start();
                 } else {
                     document.getElementById("status").innerHTML = " Baby Not Found"; 
                     synth = window.speechSynthesis;
                   utterThis = new SpeechSynthesisUtterance("Baby Not Found!");
                    synth.speak(utterThis);
                    }
        }

    }

}