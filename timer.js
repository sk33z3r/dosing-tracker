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

var timer = (function() {
    var basePeriod = 1000;
    var currentSpeed = 1;
    var startBtn;
    var timerElement;
    var menuElement;
    var durationElement;
    var timeoutRef;
    var count = 0;
    var running = 0;
    var timeString;
    return {
        start : function() {
            if (document.forms['start'].dosage.value === "") {
                alert("Dosage can't be empty!");
                process.exit(1);
            }
            currentSpeed = 1;
            startElement = document.getElementById('start');
            timerElement = document.getElementById('timer');
            menuElement = document.getElementById('menu');
            durationElement = document.getElementById('duration');
            resultsElement = document.getElementById('results');
            running = 1;
            startElement.style.display = "none";
            menuElement.style.display = "block";
            //set date and print html
            //set dosage and append first journal timestamp
            timer.run();
        },
        run: function() {
            if (running == 1) {
                if (timeoutRef) clearInterval(timeoutRef);
                var date = new Date(0);
                date.setSeconds(count);
                timeString = date.toISOString().substr(11, 8);
                if (timerElement) {
                    timerElement.innerHTML = timeString;
                }
                if (currentSpeed) {
                    timeoutRef = setTimeout(timer.run, basePeriod/currentSpeed);
                }
                ++count;
            };
        },
        stop: function() {
            running = 0;
            menuElement.style.display = "none";
            resultsElement.style.display = "block";
            durationElement.innerHTML = timeString;
        }
    }
}());