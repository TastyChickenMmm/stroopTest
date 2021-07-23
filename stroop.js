// Important variables
var date;
var EMPTY_PARAGRAPH = "<p></p>"

// Get HTML Objects
inputDiv = document.getElementById("inputDiv");
instructionsDiv = document.getElementById("instructionsDiv");
outputDiv = document.getElementById("outputDiv");

// Set up first question
var currStep = localStorage.getItem("currStep");
currStep = JSON.parse(currStep);
if (currStep == null) {
  currStep = [1,0];
}
console.log("currStep: " + currStep);

// Set up list of answers & times
var answers = localStorage.getItem(answers);
if (typeof(answers) == "undefined" || answers == null) {
  answers = [];
} else {
  answers = JSON.parse(answers);
}

var times = localStorage.getItem(times);
if (typeof(times) == "undefined" || times == null) {
  times = [];
} else {
  times = JSON.parse(times);
}

// Create Event Listeners
// Listens for answer choices. (1, 2, 3, or 4.)
document.addEventListener("keydown", function(event) {
  var key = parseInt(event.keyCode) - 48;
    if (key >= 1 && key <= 4) {
      if (currStep[1]==3) {
        answers.push(key);
        console.log("ANSWERED " + key);
        console.log("Answers: " + answers);
        localStorage.setItem("answers", JSON.stringify(answers));

        var currDate = Date.now();
        var time = currDate - date;
        times.push(time);
        console.log("Time taken (ms): " + time);
        console.log("Times: " + times);
        localStorage.setItem("times", JSON.stringify(times));
        next();
      }
    }
});

// Once called, goes to the next step of the experiment
function next(){
  // Increment current step
  currStep[1] += 1;
  if (currStep[1] > 3) {
    currStep[1] = 1;
    currStep[0] += 1;
  }

  // Save progress
  console.log("changed currStep: " + currStep);
  localStorage.setItem("currStep", JSON.stringify(currStep));
  console.log("NEXT!")

  // Display
  display(currStep);
}

function clearStorage(){
  // Uh, clears the storage
  if (!confirm("This action will permanently erase all of the data you have \
  entered into this page. Are you sure you want to continue?")) {
    // Gives a pop-up asking for confirmation
    return;
  }

  localStorage.removeItem("currStep");
  localStorage.removeItem("answers");
  localStorage.removeItem("times");
  console.log("STORAGE CLEARED");
}

function display(currStep){
  if (currStep[1] == 1) {
    inputDiv.innerHTML = displayInput(currStep[0]);
    instructionsDiv.innerHTML = EMPTY_PARAGRAPH;
    outputDiv.innerHTML = EMPTY_PARAGRAPH;
    setTimeout(next, 1000)
  }
  else if (currStep[1] == 2) {
    inputDiv.innerHTML = EMPTY_PARAGRAPH;
    instructionsDiv.innerHTML = displayInstructions(currStep[0]);
    outputDiv.innerHTML = EMPTY_PARAGRAPH;
    setTimeout(next, 1000)
  }
  else if (currStep[1] == 3) {
    inputDiv.innerHTML = EMPTY_PARAGRAPH;
    instructionsDiv.innerHTML = EMPTY_PARAGRAPH;
    outputDiv.innerHTML = displayOutput(currStep[0]);
    date = Date.now();
  }
  else {
    console.log("I-D-K, WHAT TO DISPLAY");
  }
}

function displayInput(round){
  return "<p> Input for Round " + round + " of experiment. </p>";
}

function displayInstructions(round){
  return "<p> Instructions for Round " + round + " of experiment. </p>";
}

function displayOutput(round){

  return "<p> Output for Round " + round + " of experiment. </p> <br /> <p>Out 1 Out 2 Out 3 Out 4</p>";
}
