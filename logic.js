let cnum = Math.floor(Math.random() * 100) + 1;
let attempt = 0;
let timer; //countdown timer
let timeLeft = 60; //timer duration in seconds

// DOM Elements
let userinp = document.getElementById("inp");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");
let timerDisplay = document.createElement("p"); // timer element
document.querySelector(".container").appendChild(timerDisplay); // Append timer to the container

// Function for start the timer
function startTimer() {
    timeLeft = 60; // Reset the timer
    timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;
    timerDisplay.style.color = "white";
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            subBtn.disabled = true; // Disable guess button
            userinp.disabled = true; // Disable input field
            message.innerHTML = "Time's up! Game over.";
            message.style.color = "red";
            resBtn.style.display = "block"; // Show restart button
        }
    }, 1000);
}

// Function that check user's guess
function check() {
    let usernum = parseInt(userinp.value); // Convert input to number

    // Input validation
    if (isNaN(usernum) || usernum < 1 || usernum > 100) {
        message.innerHTML = "Please enter a valid number between 1 and 100.";
        message.style.color = "red";
        return;
    }

    if (cnum == usernum) {
        message.innerHTML = "Congratulations! You guessed the number!";
        message.style.color = "green";
        clearInterval(timer); // Stop the timer
        subBtn.disabled = true;
        userinp.disabled = true;
        resBtn.style.display = "block";
    } else if (cnum < usernum) {
        message.innerHTML = "Too High! Try again.";
        message.style.color = "red";
    } else {
        message.innerHTML = "Too Low! Try again.";
        message.style.color = "red";
    }
    attempt++;
    document.getElementById("Attempt").innerHTML = attempt; // Update attempts counter
    userinp.value = ""; // Clear input field
}

// Trigger check on "Enter" key press
userinp.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        check();
    }
});

subBtn.addEventListener("click", check); // Trigger check on button click

// Restart game function
function restart() {
    cnum = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attempt = 0; // Reset attempts count
    document.getElementById("Attempt").innerHTML = attempt; // Reset attempt counter
    userinp.value = ""; // Clear input field
    message.innerHTML = ""; // Clear the message
    message.style.color = "black"; // Reset message color
    resBtn.style.display = "none"; // Hide restart button
    subBtn.disabled = false; // Enable guess button
    userinp.disabled = false; // Enable input field
    clearInterval(timer); // Stop the old timer
    startTimer(); // Start a new timer
}

resBtn.addEventListener("click", restart); // Restart game on clicking the restart button

// Start the timer when the page loads
startTimer();

