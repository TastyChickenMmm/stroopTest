// Important variables
var date;
var EMPTY_PARAGRAPH = "<p></p>"
var NUM_QUESTIONS = 1;
var INPUT_WAIT_TIME = 3000;
var INSTRUCTIONS_WAIT_TIME = 1000;

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
      setTimeout(next, INPUT_WAIT_TIME)
    } else {
      displayFinal();
    }
  }
  else if (currStep[1] == 2) {
    displayInstructions(currStep[0]);
    setTimeout(next, INSTRUCTIONS_WAIT_TIME)
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
  myDiv.innerHTML = "<p style='font-size:50px;'>Thanks for participating! Take some cats.</p>"
  +"<img src = 'images/kitty1.jpeg' alt='Kitten Image' style = 'width:800px'/>"
  +"<img src = 'images/kitty2.jpeg' alt='Kitten Image' style = 'width:800px'/>"
  +"<img src = 'images/kitty3.jpeg' alt='Kitten Image' style = 'width:800px'/>"
  +"<img src = 'images/kitty4.jpeg' alt='Kitten Image' style = 'width:800px'/>"
  +"<img src = 'images/kitty5.jpeg' alt='Kitten Image' style = 'width:800px'/>"
}


// ---------------- ALL THE QUESTIONS ARE DOWN HERE ---------------- \\

function displayInputs(round){
  switch (round) {
    case 1:
      showInput("yellow", "red");
      break;
    case 2:
      showInput("red", "black");
      break;
    case 3:
      showInput("purple", "orange");
      break;
    case 4:
      showInput("black", "green");
      break;
    case 5:
      showInput("orange", "blue");
      break;
    case 6:
      showInput("purple", "orange");
      break;
    case 7:
      showInput("red", "yellow");
      break;
    case 8:
      showInput("blue", "red");
      break;
    case 9:
      showInput("blue", "yellow");
      break;
    case 10:
      showInput("green", "black");
      break;
    case 11:
      showInput("yellow", "green");
      break;
    case 12:
      showInput("yellow", "blue");
      break;
    case 13:
      showInput("black", "red");
      break;
    case 14:
      showInput("blue", "black");
      break;
    case 15:
      showInput("purple", "green");
      break;
    case 16:
      showInput("black", "blue");
      break;
    case 17:
      showInput("green", "orange");
      break;
    case 18:
      showInput("red", "black");
      break;
    case 19:
      showInput("orange", "red");
      break;
    case 20:
      showInput("black", "blue");
      break;
    case 21:
      showInput("green", "yellow");
      break;
    case 22:
      showInput("purple", "black");
      break;
    case 23:
      showInput("red", "green");
      break;
    case 24:
      showInput("blue", "red");
      break;
    case 25:
      showInput("red", "blue");
      break;
    case 26:
      showInput("yellow", "red");
      break;
    case 27:
      showInput("purple", "orange");
      break;
    case 28:
      showInput("black", "green");
  }
}

function displayInstructions(round){
  switch (round) {
    case 1:
      showInstruction(false);
      break;
    case 2:
      showInstruction(true);
      break;
    case 3:
      showInstruction(false);
      break;
    case 4:
      showInstruction(true);
      break;
    case 5:
      showInstruction(true);
      break;
    case 6:
      showInstruction(true);
      break;
    case 7:
      showInstruction(false);
      break;
    case 8:
      showInstruction(false);
      break;
    case 9:
      showInstruction(true);
      break;
    case 10:
      showInstruction(false);
      break;
    case 11:
      showInstruction(true);
      break;
    case 12:
      showInstruction(false);
      break;
    case 13:
      showInstruction(true);
      break;
    case 14:
      showInstruction(false);
      break;
    case 15:
      showInstruction(false);
      break;
    case 16:
      showInstruction(true);
      break;
    case 17:
      showInstruction(false);
      break;
    case 18:
      showInstruction(true);
      break;
    case 19:
      showInstruction(true);
      break;
    case 20:
      showInstruction(true);
      break;
    case 21:
      showInstruction(true);
      break;
    case 22:
      showInstruction(false);
      break;
    case 23:
      showInstruction(false);
      break;
    case 24:
      showInstruction(false);
      break;
    case 25:
      showInstruction(false);
      break;
    case 26:
      showInstruction(true);
      break;
    case 27:
      showInstruction(false);
      break;
    case 28:
      showInstruction(true);
  }
}

function displayOutputs(round){
  switch (round) {
    case 1:
      showOutput("red", "black", "black", "yellow", "yellow", "blue", "purple", "red");
      break;
    case 2:
      showOutput("blue", "orange", "yellow", "red", "green", "black", "red", "yellow");
      break;
    case 3:
      showOutput("green", "orange", "yellow", "purple", "orange", "red", "purple", "black");
      break;
    case 4:
      showOutput("blue", "green", "black", "red", "red", "black", "purple", "blue");
      break;
    case 5:
      showOutput("black", "yellow", "blue", "red", "purple", "blue", "orange", "purple");
      break;
    case 6:
      showOutput("black", "blue", "purple", "green", "orange", "purple", "red", "orange");
      break;
    case 7:
      showOutput("red", "green", "orange", "purple", "green", "black", "black", "yellow");
      break;
    case 8:
      showOutput("green", "orange", "blue", "green", "orange", "red", "yellow", "blue");
      break;
    case 9:
      showOutput("blue", "orange", "orange", "yellow", "yellow", "green", "purple", "red");
      break;
    case 10:
      showOutput("green", "orange", "red", "black", "black", "blue", "yellow", "green");
      break;
    case 11:
      showOutput("red", "black", "yellow", "orange", "orange", "yellow", "purple", "green");
      break;
    case 12:
      showOutput("purple", "green", "yellow", "black", "green", "blue", "orange", "red");
      break;
    case 13:
      showOutput("black", "blue", "yellow", "green", "blue", "black", "green", "red");
      break;
    case 14:
      showOutput("green", "black", "yellow", "red", "blue", "orange", "red", "purple");
      break;
    case 15:
      showOutput("purple", "black", "green", "purple", "orange", "green", "black", "yellow");
      break;
    case 16:
      showOutput("purple", "yellow", "red", "purple", "black", "green", "orange", "blue");
      break;
    case 17:
      showOutput("purple", "orange", "black", "yellow", "orange", "red", "green", "blue");
      break;
    case 18:
      showOutput("orange", "purple", "green", "black", "black", "orange", "red", "green");
      break;
    case 19:
      showOutput("green", "red", "red", "black", "orange", "green", "yellow", "orange");
      break;
    case 20:
      showOutput("blue", "green", "red", "black", "yellow", "blue", "black", "yellow");
      break;
    case 21:
      showOutput("red", "yellow", "purple", "green", "green", "black", "orange", "blue");
      break;
    case 22:
      showOutput("green", "black", "black", "green", "purple", "orange", "orange", "yellow");
      break;
    case 23:
      showOutput("red", "blue", "purple", "orange", "blue", "green", "green", "red");
      break;
    case 24:
      showOutput("orange", "blue", "green", "red", "blue", "yellow", "black", "orange");
      break;
    case 25:
      showOutput("green", "blue", "purple", "red", "blue", "orange", "red", "black");
      break;
    case 26:
      showOutput("green", "blue", "blue", "red", "purple", "yellow", "yellow", "orange");
      break;
    case 27:
      showOutput("purple", "red", "yellow", "orange", "red", "purple", "green", "black");
      break;
    case 28:
      showOutput("green", "yellow", "orange", "purple", "red", "green", "black", "red");
  }
}

// ---------------- ALL THE QUESTIONS ARE UP THERE ---------------- \\


function showInput(word, color){
  if (color == "yellow") {
    color = "#ffdd00";
  } else if (color == "purple") {
    color = "#9403fc";
  }

  myDiv.innerHTML = "<p>" + word.toUpperCase() + "</p>"
  myDiv.style = "font-size:300px; color:" + color + ";"
}

function showInstruction(isWord){
  if (isWord) {
    myDiv.innerHTML = "<p> Select the choice with the matching WORD.</p>"
  } else {
    myDiv.innerHTML = "<p> Select the choice with the matching COLOR.</p>"
  }
  myDiv.style = "font-size:100px; color: black;"
}

function showOutput(word1, color1, word2, color2, word3, color3, word4, color4){
  if (color1 == "yellow") {
    color1 = "#ffdd00";
  } else if (color1 == "purple") {
    color1 = "#9403fc";
  }
  if (color2 == "yellow") {
    color2 = "#ffdd00";
  } else if (color2 == "purple") {
    color2 = "#9403fc";
  }
  if (color3 == "yellow") {
    color3 = "#ffdd00";
  } else if (color3 == "purple") {
    color3 = "#9403fc";
  }
  if (color4 == "yellow") {
    color4 = "#ffdd00";
  } else if (color4 == "purple") {
    color4 = "#9403fc";
  }

  myDiv.innerHTML = "<div class='container'>"
    + "<div class='row'>"
      + "<div class='col-sm'>"
        + "<p style=color:" + color1 + ">" + word1.toUpperCase() + "</p>"
      + "</div>"
      + "<div class='col-sm'>"
        + "<p style=color:" + color2 + ">" + word2.toUpperCase() + "</p>"
      + "</div>"
    + "</div>"
    + "<div class='row'>"
      + "<div class='col-sm'>"
        + "<p style=color:" + color3 + ">" + word3.toUpperCase() + "</p>"
      + "</div>"
      + "<div class='col-sm'>"
        + "<p style=color:" + color4 + ">" + word4.toUpperCase() + "</p>"
      + "</div>"
    + "</div>"
  + "</div>"


  // myDiv.innerHTML = "<p>"
  // + "<span style=color:" + color1 + ">" + word1.toUpperCase() + "</span>       "
  // + "<span style=color:" + color2 + ">" + word2.toUpperCase() + "</span><br />"
  // + "<span style=color:" + color3 + ">" + word3.toUpperCase() + "</span>       "
  // + "<span style=color:" + color4 + ">" + word4.toUpperCase() + "</span>"
  // + "</p>";
  myDiv.style = "font-size:100px;"
}
