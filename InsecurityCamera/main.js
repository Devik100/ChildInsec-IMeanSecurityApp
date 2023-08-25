ObjectDetector=0
humanFound = false
function setup() {
    cantvase=createCanvas(600, 600)
    cantvase.position(650, 300)
    console.log("Console created.")
    video = createCapture(VIDEO)
    video.hide()
    console.log("Video created.")
}
function preload() {
    ALARMDOTMPTHREE = new Audio('alarm.mp3')
    console.log("Audio created.")
}
function draw() {
    image(video, 0, 0, 600, 600)
    if(ObjectDetector != 0) {
        ObjectDetector.detect(video, gotResult);
    }
}
function beginProgram() {
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Program loading..."
    console.log("Program initiated.")
}
function modelLoaded() {
    console.log("Model Initiated.")
    status_1=true;
    document.getElementById("status").innerHTML = "Status: Program Started. Detecting Humans..."
}
function gotResult(error, results) {
    if(error) {
        console.error(error);
        document.getElementById("status").innerHTML = "Status: Error detected. Check console logs for error message."
    }
    else{
        console.log(results);
        humanFound = false
        for(i=0; i<results.length; i++) {
            document.getElementById("count").innerHTML = "Number of items: " + results.length
            noFill()
            stroke(225, 0, 0)
            rect(results[i].x, results[i].y, results[i].width, results[i].height)
            noStroke()
            fill(255, 0, 0)
            textSize(25)
            text(results[i].label, results[i].x, results[i].y)
            if(results[i].label == "person") {
                humanFound = true
                console.log("Human located. Alarm not played.")
                ALARMDOTMPTHREE.pause()
                ALARMDOTMPTHREE.currentTime = 0
            }
        }
        if(humanFound == false) {
            ALARMDOTMPTHREE.play()
            console.log("Human not located. Alarm initiated.")
        }
    }
}
function override() {
    ALARMDOTMPTHREE.pause()
    ALARMDOTMPTHREE.currentTime = 0
    console.log("Alarm overrided.")
    humanFound = true
}
