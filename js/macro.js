// set some variables
var selectionElement;
var startElement;
var timerElement;
var menuElement;
var durationElement;
var resultsElement;
var dateElement;
var journalElement;
var textEntryElement;
var voiceEntryElement;
var imageEntryElement;
var xButton;
var confirmation;
var dosage;

var initPage = function() {
    selectionElement = document.getElementById('selection');
    timerElement = document.getElementById('timer');
    menuElement = document.getElementById('menu');
    durationElement = document.getElementById('duration');
    resultsElement = document.getElementById('results');
    dateElement = document.getElementById('date');
    journalElement = document.getElementById('journal');
    textEntryElement = document.getElementById('text');
    voiceEntryElement = document.getElementById('voice');
    imageEntryElement = document.getElementById('image');
    xButton = document.getElementById('clear');
    confirmation = document.getElementById('confirmation');
    lsdStartElement = document.getElementById('lsdStart');
    mushyStartElement = document.getElementById('mushyStart');
}

var showStart = function (type) {
    selectionElement.style.display = 'none';
    if (type === "lsd") {
        lsdStartElement.style.display = 'block';
        name = "Lysergic Acid Diethylamide";
    }
    if (type === "mushy") {
        mushyStartElement.style.display = 'block';
        name = "Psilocybin Cubensis";
    }
    // set the journal date
    today = new Date();
    today = today.toLocaleString('default', { month: 'long' }) + ' ' + String(today.getDate()).padStart(2, '0') + ', ' + today.getFullYear();
    header = today + ' - ' + name;
    dateElement.appendChild(document.createTextNode(header));
}

// main timer function
var timer = (function() {
    var basePeriod = 1000;
    var currentSpeed = 1;
    var timeoutRef;
    var count = 0;
    var running = 0;
    var timeString;
    return {
        start: function(type) {
            // setup the environment based on type
            if (type === "lsd") {
                dosage = document.forms['lsdStart'].dosage.value;
                doseStamp = new Date().toLocaleTimeString();
                doseNote = "Ingested a " + dosage + "ug dose";
                startElement = lsdStartElement;
            }
            if (type === "mushy") {
                dosage = document.forms['mushyStart'].dosage.value;
                doseStamp = new Date().toLocaleTimeString();
                doseNote = "Ingested a " + dosage + "mg dose";
                if (dosage == 5000) {
                    doseNote += ' (the "Heroic Dose")';
                }
                startElement = mushyStartElement;
            }
            // if the var is empty, then the field is empty and we should exit
            if (dosage === "") {
                alert("Dosage can't be empty!");
                process.exit(1);
            }
            // set the speed modifier
            currentSpeed = 1;
            // enable the timer
            running = 1;
            // change the UI elements
            startElement.style.display = "none";
            menuElement.style.display = "block";
            // set the first journal timestamp for the dosage
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
                textEntryElement.style.display = 'block';
                xButton.style.display = 'inline';
                // hide the other entry forms if they're visible
                voiceEntryElement.style.display = 'none';
                imageEntryElement.style.display = 'none';
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
                xButton.style.display = 'none';
                // show confirmation message
                confirmation.style.display = 'block';
                setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
            }
        },
        voice: function() {
            // TODO: add voice entry
            voiceEntryElement.style.display = 'block';
            xButton.style.display = 'inline';
            // hide the other entry forms if they're visible
            textEntryElement.style.display = 'none';
            imageEntryElement.style.display = 'none';
            // https://webaudiodemos.appspot.com/AudioRecorder/index.html#
        },
        image: function() {
            // TODO: add image to journal
            imageEntryElement.style.display = 'block';
            xButton.style.display = 'inline';
            // hide the other entry forms if they're visible
            voiceEntryElement.style.display = 'none';
            textEntryElement.style.display = 'none';
            // https://jsfiddle.net/dannymarkov/cuumwch5/
        }
    }
}());

// function to hide the journal entry elements
var hideEntryElements = function() {
    voiceEntryElement.style.display = 'none';
    textEntryElement.style.display = 'none';
    imageEntryElement.style.display = 'none';
    xButton.style.display = 'none';
}

// function to add quick timestamps
var timestamp = function(mode) {
    // set the entry message
    var message;
    if (mode == "comeUp") {
        message = "The come up started.";
    }
    if (mode == "comeDown") {
        message = "The come down started.";
    }
    if (mode == "peakStart") {
        message = "A peak started.";
    }
    if (mode == "peakEnd") {
        message = "A peak ended.";
    }
    time = new Date().toLocaleTimeString();
    journalElement.appendChild(document.createElement('br'));
    journalElement.appendChild(document.createTextNode(time));
    journalElement.appendChild(document.createElement('br'));
    journalElement.appendChild(document.createTextNode(message));
    journalElement.appendChild(document.createElement('br'));
    // show confirmation message
    confirmation.style.display = 'block';
    setTimeout(() => { confirmation.style.display = 'none'; }, 3600);
}

// function to save the journal
var saveJournal = function() {
    alert("This doesn't function yet!");
    // save for later recall
    // download to specified location
}