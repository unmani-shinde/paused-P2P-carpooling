//Initialising the time with 10 minutes:
const startingMinutes = 10;
//calculating the total time in seconds:
let time = startingMinutes * 60;
//Selected the elements with the ID:countdown(mentioned in HTML file)
const countdownEl = document.getElementById('countdown');
//calling the function every millisecond
setInterval(updatecountdown, 1000);
//Declared a function to display the remaining time
function updatecountdown() {
    const minutes = Math.floor(time / 60); //(time in seconds/60)= minutes remaining
    let seconds = time % 60;// calculating the seconds remaining
    //reassigning the seconds variable
    //if seconds<10,then a zero appears before it,otherwise unchanged.
    seconds = seconds < 10 ? '0' + seconds : seconds;
    //formatting it in proper countdown format
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    //time variable decrement
    time--;
}