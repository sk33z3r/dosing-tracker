// function to convert seconds to a human readable format
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

// main timer function
var timer = (function() {
    var basePeriod = 1000;
    var currentSpeed = 1;
    var dosage;
    var startElement;
    var timerElement;
    var menuElement;
    var durationElement;
    var resultsElement;
    var dateElement;
    var journalElement;
    var timeoutRef;
    var count = 0;
    var running = 0;
    var timeString;
    return {
        // initialize everything
        start : function() {
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
            running = 1;
            // change the UI elements
            startElement.style.display = "none";
            menuElement.style.display = "block";
            // set the journal date
            today = new Date();
            today = today.toLocaleString('default', { month: 'long' }) + ' ' + String(today.getDate()).padStart(2, '0') + ', ' + today.getFullYear();
            dateElement.appendChild(document.createTextNode(today));
            // set the first journal timestamp for the dosage
            doseStamp = new Date().toLocaleTimeString() + ' - Ingested a ' + dosage + 'ug dose';
            journalElement.appendChild(document.createTextNode(doseStamp));
            // start the timer
            timer.run();
        },
        run: function() {
            if (running == 1) {
                if (timeoutRef) clearInterval(timeoutRef);
                var date = new Date(0);
                date.setSeconds(count);
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