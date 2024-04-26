document.querySelectorAll('input[name="div"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        var selectedDivId = this.value;
        // Hide all divs
        document.querySelectorAll('div[id^="div"]').forEach(function(div) {
            div.classList.add('Hidden');
        });
        // Show selected div
        document.getElementById(selectedDivId).classList.remove('Hidden');
    });
});

var EventCount = document.getElementById('EventCount');
var ImageCount = document.getElementById('ImageCount');
var VideoCount = document.getElementById('VideoCount');
var ShowEventCount = document.getElementById('ShowEventCount');
var ShowImageCount = document.getElementById('ShowImageCount');
var ShowVideoCount = document.getElementById('ShowVideoCount');

ShowEventCount.textContent = EventCount.textContent;
ShowImageCount.textContent = ImageCount.textContent;
ShowVideoCount.textContent = VideoCount.textContent;

module.exports.EventCount=EventCount.textContent;
module.exports.ImageCount=ImageCount.textContent;
module.exports.VideoCount=VideoCount.textContent;

