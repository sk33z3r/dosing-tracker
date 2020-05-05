// set some variables
var startElement;
var timerElement;
var menuElement;
var durationElement;
var resultsElement;
var dateElement;
var journalElement;
var textEntryElement;
var confirmation;
var dosage;

// main timer function
var timer = (function() {
    var basePeriod = 1000;
    var currentSpeed = 1;
    var timeoutRef;
    var count = 0;
    var running = 0;
    var timeString;
    return {
        // initialize everything
        start: function() {
            // first set the dosage var
            dosage = document.forms['start'].dosage.value;
            // if the var is empty, then the field is empty and we should exit
            if (dosage === "") {
                alert("Dosage can't be empty!");
                process.exit(1);
            }
            // define some basics
            currentSpeed = 1;
            startElement = document.getElementById('start');
            timerElement = document.getElementById('timer');
            menuElement = document.getElementById('menu');
            durationElement = document.getElementById('duration');
            resultsElement = document.getElementById('results');
            dateElement = document.getElementById('date');
            journalElement = document.getElementById('journal');
            confirmation = document.getElementById('confirmation');
            // enable the timer
            running = 1;
            // change the UI elements
            startElement.style.display = "none";
            menuElement.style.display = "block";
            // set the journal date
            today = new Date();
            today = today.toLocaleString('default', { month: 'long' }) + ' ' + String(today.getDate()).padStart(2, '0') + ', ' + today.getFullYear();
            dateElement.appendChild(document.createTextNode(today));
            // set the first journal timestamp for the dosage
            doseStamp = new Date().toLocaleTimeString();
            doseNote = "Ingested a " + dosage + "ug dose";
            journalElement.appendChild(document.createTextNode(doseStamp));
            journalElement.appendChild(document.createElement('br'));
            journalElement.appendChild(document.createTextNode(doseNote));
            journalElement.appendChild(document.createElement('br'));
            // start the timer
            timer.run();
        },
        run: function() {
            if (running == 1) {
                if (timeoutRef) clearInterval(timeoutRef);
                var date = new Date(0);
                date.setSeconds(count);
                // convert the seconds to ISO format
                timeString = date.toISOString().substr(11, 8);
                if (timerElement) {
                    // print the timestamp to the element
                    timerElement.innerHTML = timeString;
                }
                if (currentSpeed) {
                    timeoutRef = setTimeout(timer.run, basePeriod/currentSpeed);
                }
                ++count;
            };
        },
        stop: function() {
            // disable the timer
            running = 0;
            // change the UI elements
            menuElement.style.display = "none";
            resultsElement.style.display = "block";
            // print final duration
            durationElement.appendChild(document.createTextNode(timeString));
        }
    }
}());

// function to add journal entries
var journal = (function() {
    return {
        text: function(mode) {
            if (mode == "new") {
                // show the text entry form
                textEntryElement = document.getElementById('text');
                textEntryElement.style.display = 'block';
            }
            if (mode == "add") {
                thought = document.forms['text'].thought.value;
                // if the field is empty, throw a warning
                if (thought === "") {
                    alert("Text box can't be empty!");
                    process.exit(1);
                }
                // print the entry to the journal
                textStamp = new Date().toLocaleTimeString();
                journalElement.appendChild(document.createElement('br'));
                journalElement.appendChild(document.createTextNode(textStamp));
                journalElement.appendChild(document.createElement('br'));
                journalElement.appendChild(document.createTextNode(thought));
                journalElement.appendChild(document.createElement('br'));
                // hide the text entry form
                textEntryElement.style.display = 'none';
                confirmation.style.display = 'block';
                setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
            }
        },
        voice: function() {
            // TODO: add voice entry
        },
        image: function() {
            // TODO: add image to journal
        }
    }
}());

// function to add quick timestamps
var timestamp = function(mode) {
    if (mode == "comeUp") {
        time = new Date().toLocaleTimeString();
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode(time));
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode("The come up started."));
        journalElement.appendChild(document.createElement('br'));
        confirmation.style.display = 'block';
        setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
    }
    if (mode == "comeDown") {
        time = new Date().toLocaleTimeString();
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode(time));
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode("The come down started."));
        journalElement.appendChild(document.createElement('br'));
        confirmation.style.display = 'block';
        setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
    }
    if (mode == "peakStart") {
        time = new Date().toLocaleTimeString();
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode(time));
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode("A peak started."));
        journalElement.appendChild(document.createElement('br'));
        confirmation.style.display = 'block';
        setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
    }
    if (mode == "peakEnd") {
        time = new Date().toLocaleTimeString();
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode(time));
        journalElement.appendChild(document.createElement('br'));
        journalElement.appendChild(document.createTextNode("A peak ended."));
        journalElement.appendChild(document.createElement('br'));
        confirmation.style.display = 'block';
        setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
    }
}
