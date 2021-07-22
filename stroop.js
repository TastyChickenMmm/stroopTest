// Important variables
var testedAll;

// Get HTML Objects
inputDiv = document.getElementById("inputDiv");
instructionsDiv = document.getElementById("instructionsDiv");
outputDiv = document.getElementById("outputDiv");


// Set up first question
var currStep = localStorage.getItem("currStep");
currStep = JSON.parse(currStep);
if (currStep == null) {
  currStep = [1,1];
}
console.log("currStep: " + currStep);

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
  console.log("STORAGE CLEARED");
}

function display(currStep){
  
}
