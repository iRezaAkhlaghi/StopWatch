let Start = document.querySelector(".start");
let lap = document.querySelector(".lap");

let startTime = 0;
let elapsedTime = 0;
let timer = null

let isRunning = false
let isPaused = false




Start.addEventListener("click", () => {
    if (!isRunning && !isPaused) {
        ///Click Start
        Start.innerHTML = "Stop"
        lap.classList.add("active")
        startTime = Date.now()
        StartCount()


        isRunning = true
    }
    else if (isRunning) {
        ///Click Pause
        clearInterval(timer)
        elapsedTime = Date.now() - startTime

        Start.innerHTML = "Resume";
        lap.innerHTML = "Reset";
        document.title = "Paused 🛑";

        isRunning = false
        isPaused = true
    }
    else if (isPaused) {
        ///Click Resume  
        startTime = Date.now() - elapsedTime;
        StartCount()

        Start.innerHTML = "Stop";
        lap.innerHTML = "Lap";

        isPaused = false
        isRunning = true
    }

})



let timelaps = 0;

lap.addEventListener("click", () => {
    if (isRunning) {

        timelaps++;

        const time = FomatedTime(Date.now() - startTime);

        const row = document.createElement("tr");
        row.innerHTML = `<td>${timelaps}</td><td>${time}</td>`;
        document.querySelector(".lap-table").appendChild(row);



    } else if (isPaused) {
        // Reset
        clearInterval(timer);
        elapsedTime = 0;
        timelaps = 0;
        document.querySelector(".Time").innerText = "00:00:00";
        document.querySelector(".lap-table").innerHTML = "";
        Start.innerHTML = "Start";
        lap.innerHTML = "Lap";
        lap.classList.remove("active");
        document.title = "Stop watch";
        isRunning = false;
        isPaused = false;
    }
});


// Starts the main timer using setInterval
function StartCount() {
    timer = setInterval(() => {
        const Now = Date.now();
        const Diffrence = Now - startTime;

        document.querySelector(".Time").innerHTML = FomatedTime(Diffrence);

        document.title = FomatedTime(Diffrence) + " ⏱️";

    }, 10)
}

// Converts elapsed time in milliseconds to a formatted string (hh:mm:ss)
function FomatedTime(ms) {
    // let milliSeconds = ms % 1000;
    let totalSeconds = Math.floor(ms / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60
    let hours = Math.floor(totalSeconds / 3600)

    const Format = (n) => n.toString().padStart(2, "0")

    return `${Format(hours)}:${Format(minutes)}:${Format(seconds)}`;

}  