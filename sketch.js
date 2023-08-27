let snowflakes = [];
let ground = [];
const minSpeed = 1;
const maxSpeed = 9;
let chance = 8;
let score = 0;
let room;
let airPurifier;
let asthmaIinhaler;
let carpet;
let cat;
let clousedWindow;
let flower;
let openWindow;
let mask;
let circleX;
let circleY;
let circleSize;
let wi = 1024;
let hi = 576;
let displayText = '';
let displayTime = 0;
let gameState = 'start'; // Can be 'start', 'play', or 'end'
let airPurifierClicked = false;
let originalImages = {};
let circlecolor = [120, 170, 200];
let bgMusic;
let succMusic;
let errorMusic;
let endMusic;
let hasPlayedEndSound = false;
//let locpath = '';
function preload() {
    room = loadImage('https://i.imgur.com/VLEYLHA.png');
    originalImages.asthmaIinhaler = loadImage('https://i.imgur.com/AgyKZ6d.png');
    originalImages.carpet = loadImage('https://i.imgur.com/cwzbDny.png');
    originalImages.cat = loadImage('https://i.imgur.com/Rx5GEMh.png');
    originalImages.flower = loadImage('https://i.imgur.com/oP6mmjf.png');
    originalImages.openWindow = loadImage('https://i.imgur.com/FLaPAci.png');
    originalImages.mask = loadImage('https://i.imgur.com/FjaVVXU.png');
    originalImages.airPurifier = loadImage('https://i.imgur.com/fD6Ga2H.png');
    originalImages.clousedWindow = loadImage('https://i.imgur.com/OeSwJNw.png');
    bgMusic = loadSound("music/thunder.mp3");
    succMusic = loadSound("music/success.mp3");
    errorMusic = loadSound("music/error.mp3");
    endMusic = loadSound("music/end.mp3");
}
function setup() {
    createCanvas(1024, 676 );
    bgMusic.setVolume(0.2);
    bgMusic.loop();
    initGame(); // Initialize game variables
    // Initialize snowflakes
    for(let i = 0; i < 100; i++){
        snowflakes.push(createVector(
            random(width), random(height),
            random(minSpeed, maxSpeed)));
    }

    // Initialize ground
    for(let x = 0; x < width; x++) {
        ground[x] = height;
    }
}
function initGame() {
    // Reset game variables for a new round
    asthmaIinhaler = originalImages.asthmaIinhaler;
    carpet = originalImages.carpet;
    cat = originalImages.cat;
    flower = originalImages.flower;
    openWindow = originalImages.openWindow;
    mask = originalImages.mask;
    airPurifier = originalImages.airPurifier;
    clousedWindow = originalImages.clousedWindow;

    airPurifier.resize(wi/3, wi/3);
    asthmaIinhaler.resize(hi/8, hi/8);
    carpet.resize(hi/3, hi/3);
    cat.resize(hi/4, hi/4);
    clousedWindow.resize(220, 220);
    flower.resize(hi/5, hi/5);
    openWindow.resize(290, 290);
    mask.resize(hi/8, hi/8);
    noFill();
    strokeWeight(5);
    circleX = width / 2;
    circleY = height / 2;
    circleSize = 0;
    chance = 8;
    score = 0;
    airPurifierClicked = false;
    circlecolor = [120, 170, 200];
    hasPlayedEndSound = false;
}


function draw() {
    background(0);
    if (gameState === 'start') {
        // Show game start screen
        background(0, 0, 32);
        fill(255);
        stroke(155);
        bgMusic.pause();
        // Draw snowflakes

        for(const snowflake of snowflakes) {
            snowflake.y += snowflake.z;
            rect(snowflake.x, snowflake.y, 1, 1);
            if(snowflake.y >= ground[floor(snowflake.x)]) {
                ground[floor(snowflake.x)]--;
                snowflake.x = random(width);
                snowflake.y = 0;
            }
        }
        for(let x = 0; x < width; x++) {
            rect(x, ground[x], 1, height - ground[x]);
        }
        fill(255);
        stroke(155);
        textSize(35);
        textAlign(CENTER);
        text("Welcome to the Thunderstorm Asthma Prevention Game!\n🌩🌺⛈🌺⛈🌺🌩", width / 2, height / 2 - 160);

        textSize(33);


        text("Press 'G' on your keyboard to start the game.", width / 2, height / 2 - 30);
        textSize(24);
        text("\n\nYou have 8 chances. Use your mouse to click on the item", width / 2, height / 2);
        text("\n\nthat you think should be acted upon to prevent thunderstorm asthma.", width / 2, height / 2 + 30);
        textSize(20);
        text("\n\n\n(Tips: The answer is in the video above!)", width / 2, height / 2 + 60);

    }
    else if (gameState === 'playing') {
        if (!bgMusic.isPlaying()) {  // Check if the music is already playing
            bgMusic.play();  // Start the music
        }
        noFill();
        image(room, 0, 100);
        //let chanceR =  chance-1;
        textAlign(LEFT);
        fill(255);
        stroke(155);
        let chanceT = 'Chance: ' + chance;
        let scoreT = 'Score: ' + score;
        textSize(24);
        textStyle(NORMAL);
        //text(chanceT, 900,  416);
        text(chanceT, 20,  37);
        text(scoreT, 20,  80);
        // Display the text if the current time is less than the displayTime
        if (millis() < displayTime) {
            textSize(20);
            textAlign(CENTER);

            text(displayText, width/2+70, 30);
        }else
        {
            textSize(20);
            textAlign(CENTER);
            text("Use your mouse to click on the item \nthat you think should be acted upon to prevent thunderstorm asthma.", width/2+170, 30);
        }

        noFill();
        stroke(circlecolor);
        // Draw images only if they are not clicked
        image(airPurifier, 773, 316);
        if (asthmaIinhaler) image(asthmaIinhaler, 683, 431);
        if (carpet) image(carpet, 405, 503);
        if (cat) image(cat, 205, 488);
        if (flower) image(flower, 95, 113);
        if (mask) image(mask, 683, 478);
        image(clousedWindow, 769, 113);
        if (openWindow) image(openWindow, 729, 93);

        circleSize += 10;
        circle(circleX, circleY, circleSize * 1.25);
        circle(circleX, circleY, circleSize * 1.75);
        circle(circleX, circleY, circleSize * 2.15);

    } else if (gameState === 'end') {
        // Show game over screen
        background(0, 0, 32);
        fill(255);
        stroke(155);
        bgMusic.pause();
        if (!hasPlayedEndSound) {
            endMusic.play();
            hasPlayedEndSound = true;
        }
        // Draw snowflakes

        for(const snowflake of snowflakes) {
            snowflake.y += snowflake.z;
            rect(snowflake.x, snowflake.y, 1, 1);
            if(snowflake.y >= ground[floor(snowflake.x)]) {
                ground[floor(snowflake.x)]--;
                snowflake.x = random(width);
                snowflake.y = 0;
            }
        }
        for(let x = 0; x < width; x++) {
            rect(x, ground[x], 1, height - ground[x]);
        }
        textSize(48);
        textAlign(CENTER);
        text("Game Over", width / 2 , 150);
        text("Score: " + score, width / 2 , 220);
        textSize(24);
        // Display a message based on the score
        if (score < 60) {
            text("🌟 Good try, little adventurer! 🌟", width / 2 , 300);
            text("Watch the Thunderstorm Asthma Related Knowledge Teaching video for hints!", width / 2, 350);
        } else if (score < 80) {
            text("🌟🌟🌟 Great job! You're doing well! 🌟🌟🌟", width / 2 , 300);
            text("Watch the Thunderstorm Asthma Related Knowledge Teaching video for even better results!", width / 2, 350);
        } else if (score < 100) {
            text("🌈Fantastic! You're almost perfect! 🌈", width / 2 , 300);
            text("Watch the Thunderstorm Asthma Related Knowledge Teaching video to score 100!", width / 2, 350);
        } else {
            text("🌈🌈🌈 Wow! You're absolutely flawless! 🌈🌈🌈", width / 2 , 300);
            text("Thunderstorm asthma isn't so scary if we're all prepared, knowledge is power!", width / 2, 350);

        }
        textSize(28);
        text("Click to Restart", width / 2 , height / 2 + 150);


    }
}

function mousePressed() {
    let imageClicked = false;

    // if (gameState === 'start') {
    //     gameState = 'playing'; // Start the game
    // } else
        if (gameState === 'playing') {
        chance--;
        if (chance <= 0) {
            gameState = 'end'; // End the game
        }
        // Check if images are clicked and update the variables accordingly
        if (asthmaIinhaler && mouseX >= 683 && mouseX <= 683 + asthmaIinhaler.width && mouseY >= 431 && mouseY <= 431 + asthmaIinhaler.height) {
            asthmaIinhaler = null;
            displayText = 'Congratulations, you have an asthma inhaler on your side!\n This is your lifesaver! \nYou got 20 points!';
            displayTime = millis() + 10000;
            score += 20;
            imageClicked = true;
        }
        else if(carpet && mouseX >= 405 && mouseX <= 405 + carpet.width && mouseY >= 503 && mouseY <= 503 + carpet.height) {
            carpet = null;
            displayText = 'Congratulations, you put the plush rugs in the storage room!\nLong carpets are hiding spots for dust and pollen. \nYou got 10 points!';
            displayTime = millis() + 10000;
            score += 10;
            imageClicked = true;
        }
        else if (cat && mouseX >= 205 && mouseX <= 205 + cat.width && mouseY >= 488 && mouseY <= 488 + cat.height) {
            cat = null;
            displayText = 'Congratulations, you let your pet go to another room!\nPet hair may exacerbate your allergic reaction. \nYou got 10 points!';
            displayTime = millis() + 10000;
            score += 10;
            imageClicked = true;
        }
        else if (flower && mouseX >= 95 && mouseX <= 95 + flower.width && mouseY >= 113 && mouseY <= 113 + flower.height) {
            flower = null;
            displayText = 'Congratulations, you got Mom to put the blooming potted plant in the other room!\nFlowering plants give you more allergens. \nYou got 10 points!';
            displayTime = millis() + 10000;
            score += 10;
            imageClicked = true;
        }
        else if (openWindow && mouseX >= 729 && mouseX <= 729 + openWindow.width && mouseY >= 93 && mouseY <= 93 + openWindow.height) {
            openWindow = null;
            displayText = 'Congratulations, you closed the window!\nThis keeps pollen and dust out. \nYou got 20 points!';
            displayTime = millis() + 10000;
            score += 20;
            imageClicked = true;
        }
        else if (mask && mouseX >= 683 && mouseX <= 683 + mask.width && mouseY >= 478 && mouseY <= 478 + mask.height) {
            mask = null;
            displayText = 'Congratulations, you have put on a mask!\nThis can reduce the inhalation of harmful substances. \nYou got 10 points!';
            displayTime = millis() + 10000;
            score += 10;
            imageClicked = true;
        }
        else if (!airPurifierClicked && mouseX >= 900 && mouseX <= 900 + airPurifier.width && mouseY >= 416 && mouseY <= 416 + airPurifier.height) {
            displayText = 'Congratulations, you turned on your air purifier!\nThis helps clear the air of unwanted particles. \nYou got 20 points!';
            displayTime = millis() + 10000;
            score += 20;
            airPurifierClicked = true;
            imageClicked = true;
        }
        else {
            displayText = 'Oops, nothing helpful here.';
            displayTime = millis() + 10000;
        }



        if (imageClicked) {
            //stroke(0, 255, 0); // Circle turns green when clicked
            circlecolor = [0, 255, 0];
            succMusic.setVolume(0.5);
            succMusic.play();
        } else {
            //stroke(255, 0, 0); // Circle is red otherwise\
            circlecolor = [255, 0, 0];
            errorMusic.play();
        }

        circleX = mouseX;
        circleY = mouseY;
        circleSize = 0;

    } else if (gameState === 'end') {
        gameState = 'start'; // Restart the game
        initGame(); // Initialize game variables for a new round

    }
}

function keyPressed() {
    if (gameState === 'start' && key.toUpperCase() === 'G') {
        gameState = 'playing'; // Start the game
    }

}
