var units = ["Archon", "Carrier", "Colossus", "Dark Templar", "High Templar", "Immortal", "Observer", "Phoenix", "Probe", "Sentry", "Stalker", "Void Ray", "Warp Prism", "Zealot", "Zergling", "Roach", "Hydralisk", "Overlord", "Mutalisk", "Queen", "Ultralisk", "Guardian", "Scourge", "Infestor", "Brood Lord", "Drone", "Baneling", "Corruptor", "Lurker", "Marine", "Firebat", "SCV", "Science Vessel", "Siege Tank", "Vulture", "Hellion", "Marauder", "Medic", "Medivac", "Wraith", "Banshee", "Battle Cruiser", "Viking", "Thor", "Ghost", "Reaper"]
var unit = units[Math.floor(Math.random() * units.length)];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var correctString = ""
var wrongString = ""
var wins = 0;
var winCondition = unit.length

for (var i = 0; i < unit.length; i++) {
    if (letters.includes(unit[i].toLowerCase())) {
        var blanks = $("<h3 id =" + i + ">_&nbsp</h3>");
        $("#word").append(blanks);
    } else { $("#word").append(String.fromCharCode(160) + String.fromCharCode(160)); }
};

document.onkeyup = function (pressed) {
    var userPressed = pressed.key.toLowerCase();
    if (userPressed === "enter") {
        // pick a new word from the units array
        unit = units[Math.floor(Math.random() * units.length)];
        // empty all of the things that fill up during the game
        $(".changers").empty();
        $("#defeat").addClass("invisible");
        $("#victory").addClass("invisible");
        // put a space for each character in the word in an h3 with the id i (it's position in the word)
        for (var i = 0; i < unit.length; i++) {
            if (letters.includes(unit[i].toLowerCase())) {
                var blanks = $("<h3 id =" + i + ">_&nbsp</h3>");
                $("#word").append(blanks);
            } else { $("#word").append(String.fromCharCode(160) + String.fromCharCode(160)); }
        };

        $("img").animate({ opacity: 1 });
        wrongString="";
        winCondition = unit.length;
        // if the word contains the character typed, replace the corresponding space with the letter
    } else if (unit.toLowerCase().includes(userPressed)) {
        $("#guessed").append(userPressed.toLowerCase());
        for (var i = 0; i < unit.length; i++) {
            if (userPressed === unit[i].toLowerCase()) {
                $("#" + i).text(unit[i]);
                winCondition--;
                console.log(winCondition);
                if (winCondition === 0) {
                    $("#victory").removeClass("invisible");
                    wins++;
                    document.getElementById("winCount").textContent = wins;
                    
                }
            }
        }
        
    } // if what the user types is not in the word, and it is a letter, add it to the end of the guessed letters
    if ((unit.indexOf(userPressed) === -1) && (letters.includes(userPressed.toLowerCase())) && (unit.indexOf(userPressed.toUpperCase()) === -1)) {
        $("#guessed").append(userPressed.toLowerCase());
        wrongString = wrongString + userPressed;
        var wsl = wrongString.length;
        for (var w = 0; w < wsl; w++) {
            $("#wrong" + w).animate({ opacity: 0 });
            var audio = new Audio('assets/images/sound.mp3');
            audio.play();
            if (w === 11) {
                $("#defeat").removeClass("invisible");
            }
        }
    }
}