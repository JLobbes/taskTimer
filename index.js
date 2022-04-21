//Table of Contents
    //Make Sure jQuery is Working
    //Event Listeners to Trigger Toggle Functions
    //Toggle Functions
        //ToggleOptionRight
        //ToggleOptionLeft
        //ToggleTimeRight                       (00 00 UNDER CONSTRUCTION 00 00)
        //ToggleTimeLeft                        (00 00 UNDER CONSTRUCTION 00 00)
    //Toggle Support Functions
        //Toggle Stage
            //Advance Stage
            //Regress Stage
        //Reset DOM after Animation
            //clearOptions Div
            //resetOptions Div


//Make Sure jQuery is Working
$( document ).ready(function() {
    console.log('jQueary has successfully loaded')

    clearOptions();
    $('#options').append(resetOptions(optionMain, myOptions, 'right'));
  });

//Event Listeners to Trigger Toggle Functions

document.onkeydown = checkKey;
function checkKey(e) {

    //Check Stage

    //Listen for Which Key
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(stage == 'taskOptions')toggleOptionLeft();
       if(stage == 'taskTime')toggleTimeLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(stage =='taskOptions') toggleOptionRight();
       if(stage == 'taskTime') toggleTimeRight();
    }
}

$('.toggle-right-arrow').click(function () {
    if(stage =='taskOptions') toggleOptionRight();
    if(stage == 'taskTime') toggleTimeRight();
});
$('.toggle-left-arrow').click(function() {
    if(stage == 'taskOptions')toggleOptionLeft();
    if(stage == 'taskTime')toggleTimeLeft();
});

//Toggle Functions
function toggleOptionLeft() {
    console.log('initiated toggleOptionLeft()')
    
    //Animation Portion
    $('.hidden-option-left').addClass('grow-option-from-left');
    $('.option-left').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-right');
    $('.option-right').addClass('shrink-option-to-right');

    //Restructuring DOM
    setTimeout(function() {
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'left'));
    }, 320);
}

function toggleOptionRight() {
    console.log('initiated toggleOptionRight()')
    
    //Animation Portion
    $('.hidden-option-right').addClass('grow-option-from-right');
    $('.option-right').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-left');
    $('.option-left').addClass('shrink-option-to-left');

    //Restructuring DOM
    setTimeout(function() {        
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'right'));
    }, 320);
}

function toggleTimeLeft() {
    console.log('initiated toggleTimeLeft');

    //Animation Portion
    $('.hidden-time-left').addClass('grow-time-from-left');
    $('.time-leftmost').addClass('occupy-time-left-from-left');
    $('.time-left').addClass('occupy-time-middle');
    $('.time-main').addClass('occupy-time-right-from-middle');
    $('.time-right').addClass('occupy-time-rightmost-from-left');
    $('.time-rightmost').addClass('shrink-time-to-right');

    //Restructuring DOM
    setTimeout(function() {        
        clearTimes();
        $('#time').append(resetTimes(timeMain, 'left'));
    }, 320);
}

function toggleTimeRight() {
    console.log('initiated toggleTimeRight');

    //Animation Portion
    $('.hidden-time-right').addClass('grow-time-from-right');
    $('.time-rightmost').addClass('occupy-time-right-from-right');
    $('.time-right').addClass('occupy-time-middle');
    $('.time-main').addClass('occupy-time-left-from-middle');
    $('.time-left').addClass('occupy-time-leftmost-from-right');
    $('.time-leftmost').addClass('shrink-time-to-left');

    //Restructuring DOM
    setTimeout(function() {        
        clearTimes();
        $('#time').append(resetTimes(timeMain, 'right'));
    }, 320);
}

//Toggle Support Functions
    //Restructure DOM after Animation
let stage = 'taskOptions';

function advanceStage() {
    $('#options').remove();
    $('#time').removeClass('invisible');
    $('#time').addClass('flex');
    $('.prompt h1').text('How long would you like to do this for?');
    stage = 'taskTime';
}

function regressStage() {
    stage = 'tastOptions'
}

function clearOptions() {
    $('.hidden-option-left').remove();
    $('.option-left').remove();
    $('.option-main').remove();
    $('.option-right').remove();
    $('.hidden-option-right').remove();   
    console.log('cleared Options')
}

function resetOptions(optionInFocus, options, direction) {
    const numOfOptions = options.length
    if (numOfOptions == 0) return undefined; 

    optionsRepeated = [...options, ...options, ...options, ...options, ...options, ...options,...options];
    let focalIndex = optionsRepeated.indexOf(optionInFocus, 3);

    if(direction == 'left') focalIndex -= 1;
    if(direction == 'right') focalIndex += 1;

    optionMain = optionsRepeated[focalIndex];

    console.log('options Reset')

    //Ready Page to Accept Time (Doesn't Belong Here)
    //Trigger swapToTime Function
    $(document).ready(function() {
        $('.option-main').click(function () {
            advanceStage();
        });
        $('.option-left').click(function() {
            advanceStage();
        });
        $('.option-right').click(function() {
            advanceStage();
        });
    });    

    return `<div class="hidden-option-left center-text"><p>${optionsRepeated[focalIndex - 2]}</p></div>
            <div class="option-left center-text" tabindex='3'><p>${optionsRepeated[focalIndex - 1]}</p></div>
            <div class="option-main center-text" tabindex='1'><p>${optionsRepeated[focalIndex]}</p></div>
            <div class="option-right center-text" tabindex='2'><p>${optionsRepeated[focalIndex + 1]}</p></div>
            <div class="hidden-option-right center-text"><p>${optionsRepeated[focalIndex + 2]}</p></div>`;
};

let optionMain = 'A';
let myOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function clearTimes() {
    $('.hidden-time-left').remove(); 
    $('.time-leftmost').remove();
    $('.time-left').remove();
    $('.time-main').remove();
    $('.time-right').remove();
    $('.time-rightmost').remove();
    $('.hidden-time-right').remove();
}

function resetTimes(currentTime, direction) {
    
    let hoursIn = parseInt(currentTime.split(':')[0]);
    let minutesIn = parseInt(currentTime.split(':')[1]) + (hoursIn * 60)
    
    if(direction == 'right') minutesIn += 1;
    if(direction == 'left') minutesIn -= 1;
    if(minutesIn < 3) minutesIn = 3;

    function formatTime(minutes) {
        let hoursOut = (Math.floor(minutes / 60)).toString();
        let minutesOut = (minutes - (hoursOut * 60)).toString();
        
        let padHours = hoursOut.padStart(2,'0');
        let padMinutes = minutesOut.padStart(2,'0');

        return `${padHours}:${padMinutes}'`;
    };

    timeMain = formatTime(minutesIn);

    return `<div class="hidden-time-left center-text"><p>${formatTime(minutesIn - 3)}</p></div>
            <div class="time-leftmost center-text hover-highlight" tabindex="4"><p>${formatTime(minutesIn - 2)}</p></div>
            <div class="time-left center-text hover-highlight" tabindex="5"><p>${formatTime(minutesIn - 1)}</p></div>
            <div class="time-main center-text hover-highlight" tabindex="1"><p>${formatTime(minutesIn)}</p></div>
            <div class="time-right center-text hover-highlight" tabindex="2"><p>${formatTime(minutesIn + 1)}</p></div>
            <div class="time-rightmost center-text hover-highlight" tabindex="3"><p>${formatTime(minutesIn + 2)}</p></div>
            <div class="hidden-time-right center-text"><p>${formatTime(minutesIn + 3)}</p></div>`;
};


let timeMain = '00:30\''