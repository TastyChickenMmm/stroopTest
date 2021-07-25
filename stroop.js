// Important variables
var date;
var EMPTY_PARAGRAPH = "<p></p>"
var NUM_QUESTIONS = 3;

// Get HTML Objects
myDiv = document.getElementById("myDiv");

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
    if (currStep[0] <= NUM_QUESTIONS) {
      displayInputs(currStep[0]);
      setTimeout(next, 1000)
    } else {
      displayFinal();
    }
  }
  else if (currStep[1] == 2) {
    displayInstructions(currStep[0]);
    setTimeout(next, 1000)
  }
  else if (currStep[1] == 3) {
    displayOutputs(currStep[0]);
    date = Date.now();
  }
  else {
    console.log("I-D-K, WHAT TO DISPLAY");
  }
}

function displayFinal(){
  myDiv.innerHTML = "<p>Thanks for participating!</p>";
}


// ---------------- ALL THE QUESTIONS ARE DOWN HERE ---------------- \\

function displayInputs(round){
  showInput("word" + round, "red");
  // myDiv.innerHTML = "<p> Input for Round " + round + " of experiment. </p>";
}

function displayInstructions(round){
  showInstruction(true);
  // myDiv.innerHTML = "<p> Instructions for Round " + round + " of experiment. </p>";
}

function displayOutputs(round){
  showOutput("word1", "red", "word2", "yellow", "word3", "green", "word4", "blue");
  // myDiv.innerHTML = "<p> Output for Round " + round + " of experiment. </p> <br /> <p>Out 1 Out 2 Out 3 Out 4</p>";
}

// ---------------- ALL THE QUESTIONS ARE UP THERE ---------------- \\


function showInput(word, color){
  if (color == "yellow") {
    color = "#ffdd00";
  }
  myDiv.innerHTML = "<p>" + word.toUpperCase() + "</p>"
  myDiv.style = "text-size:100px; color:" + color + ";"
}

function showInstruction(isWord){
  if (isWord) {
    myDiv.innerHTML = "<p> Select the matching WORD.</p>"
  } else {
    myDiv.innerHTML = "<p> Select the matching COLOR.</p>"
  }
  myDiv.style = "text-size:100px; color: black;"
}

function showOutput(word1, color1, word2, color2, word3, color3, word4, color4){
  if (color1 == "yellow") {
    color1 = "#ffdd00";
  }
  if (color2 == "yellow") {
    color2 = "#ffdd00";
  }
  if (color3 == "yellow") {
    color3 = "#ffdd00";
  }
  if (color4 == "yellow") {
    color4 = "#ffdd00";
  }
  myDiv.innerHTML = "<p>"
  + "<span style=color:" + color1 + ">" + word1 + "</span>       "
  + "<span style=color:" + color2 + ">" + word2 + "</span><br />"
  + "<span style=color:" + color3 + ">" + word3 + "</span>       "
  + "<span style=color:" + color4 + ">" + word4 + "</span>"
  + "</p>";
}
