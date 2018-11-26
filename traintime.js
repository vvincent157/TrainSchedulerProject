 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAnmHMsDZ15BX-WpbkNYqRiyiaBmoZKsfY",
    authDomain: "train-time-41fb9.firebaseapp.com",
    databaseURL: "https://train-time-41fb9.firebaseio.com",
    projectId: "train-time-41fb9",
    storageBucket: "",
    messagingSenderId: "330638090860"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log(event)
   // Grabs user input
   var trainName = $("#train-name-input").val().trim();
   var destination = $("#destination-input").val().trim();
   var firstTrain = moment($("#first-train-input").val().trim(), 'h:mm:ss a').format("X");
   var frequency = $("#frequency-input").val().trim();
 
   // Creates local "temporary" object for holding train data
   var newTrain = {
     name: trainName,
     destination: destination,
     first: firstTrain,
     frequency: frequency
   };
 
   // Uploads train data to the database
   database.ref().push(newTrain);
 
   // Logs everything to console
   console.log(newTrain.name);
   console.log(newTrain.destination);
   console.log(newTrain.first);
   console.log(newTrain.frequency);
 
   alert("Train successfully added");
 
   // Clears all of the text-boxes
   $("#train-name-input").val("");
   $("#destination-input").val("");
   $("#first-train-input").val("");
   $("#frequency-input").val("");
 });
 
 // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot) {
   console.log(childSnapshot.val());
 
   // Store everything into a variable.
   var trainName = childSnapshot.val().name;
   var destination = childSnapshot.val().destination;
   var firstTrain = childSnapshot.val().first;
   var frequency = childSnapshot.val().frequency;
 
   var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + timeDiff);

   // Time apart (remainder)
   var timeRemainder = timeDiff % frequency;
   console.log(timeRemainder);

   // Minute Until Train
   var timeMinutesTillTrain = frequency - timeRemainder;
   console.log("MINUTES TILL TRAIN: " + timeMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(timeMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// Next train arrival
var nextTrainArrival = moment(nextTrain).format("hh:mm");

// Create variable
$("#train-table").append("<div class='well'><span class='train-name'> " +
childSnapshot.val().name +
" </span><span class='train-name'> " + childSnapshot.val().name +
" </span><span class='destination'> " + childSnapshot.val().destination + 
" </span><span class='train-first'> " + childSnapshot.val().first +
" </span><span class='frequency'> " + childSnapshot.val().frequency +
" </span></div>");

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});


// Cant figure why my time updates arent showing up in the DOM but in the console })