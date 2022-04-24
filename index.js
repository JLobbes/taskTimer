//Table of Contents
    //Make Sure jQuery is Working
    //Event Listeners
        //Listen for Keypress
            //checkKey()
        //Listen for Arrow Button Clicks
            //Left & Right Option Arrow
            //Up & Down Digit Arros
        //Listen for Tab-Focus Location
            //...[Nothing Here Yet]
            //Digit Place
                //adjustDigitPlace()
    //Scroll Functions
        //var functionLock
        //scrollOptionRight()
        //scrollOptionLeft()
        //scrollTimeUp()
        //scrollTimeDown()
    //Scroll Support Functions
        //Manipulate Stage
            //var stage
            //Advance Stage()
            //Regress Stage()
        //Reset DOM after Animation
            //clearOptions()
            //resetOptions()
            //var optionMain


//Make Sure jQuery is Working
$( document ).ready(function() {
    console.log('jQueary has successfully loaded')

    //Refresh options on-load
    clearOptions();
    $('#options').append(resetOptions(optionMain, myOptions, 'right'));
  });

//Event Listeners
    //Listen for Keypress
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        //up arrow
        if(currentDigitPlace == 1) scrollTimeUp('#hours_tens');
        if(currentDigitPlace == 2) scrollTimeUp('#hours_ones');
        if(currentDigitPlace == 3) scrollTimeUp('#minutes_tens');
        if(currentDigitPlace == 4) scrollTimeUp('#minutes_ones');
        if(currentDigitPlace == 5) scrollTimeUp('#seconds_tens');
        if(currentDigitPlace == 6) scrollTimeUp('#seconds_ones');
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(currentDigitPlace == 1) scrollTimeDown('#hours_tens');
        if(currentDigitPlace == 2) scrollTimeDown('#hours_ones');
        if(currentDigitPlace == 3) scrollTimeDown('#minutes_tens');
        if(currentDigitPlace == 4) scrollTimeDown('#minutes_ones');
        if(currentDigitPlace == 5) scrollTimeDown('#seconds_tens');
        if(currentDigitPlace == 6) scrollTimeDown('#seconds_ones');
    }
    else if (e.keyCode == '37') {
       // left arrow
       scrollOptionLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       scrollOptionRight();
    }
}

//Event Listeners
    //Listen for Arrow Button Click
        //Left & Right Option Arrows
$('.toggle-right-arrow').click(function () {
    scrollOptionRight();
});
$('.toggle-left-arrow').click(function() {
    scrollOptionLeft();
});

        //Left & Right Option Arrows
$('#hours_tens .up-arrow').click(function() {
    console.log('hours_tens place toggled')
    scrollTimeUp('#hours_tens');
});
$('#hours_ones .up-arrow').click(function() {
    console.log('hours_ones place toggled')
    scrollTimeUp('#hours_ones');
});
$('#minutes_tens .up-arrow').click(function() {
    console.log('minutes_tens place toggled')
    scrollTimeUp('#minutes_tens');
});
$('#minutes_ones .up-arrow').click(function() {
    console.log('minutes_ones place toggled')
    scrollTimeUp('#minutes_ones');
});
$('#seconds_tens .up-arrow').click(function() {
    console.log('seconds_tens place toggled')
    scrollTimeUp('#seconds_tens');
});
$('#seconds_ones .up-arrow').click(function() {
    console.log('seconds_ones place toggled')
    scrollTimeUp('#seconds_ones');
});
$('#hours_tens .down-arrow').click(function() {
    console.log('hours_tens place toggled');
    scrollTimeDown('#hours_tens');
});
$('#hours_ones .down-arrow').click(function() {
    console.log('hours_ones place toggled');
    scrollTimeDown('#hours_ones');
});
$('#minutes_tens .down-arrow').click(function() {
    console.log('minutes_tens place toggled');
    scrollTimeDown('#minutes_tens');
});
$('#minutes_ones .down-arrow').click(function() {
    console.log('minutes_ones place toggled');
    scrollTimeDown('#minutes_ones');
});
$('#seconds_tens .down-arrow').click(function() {
    console.log('seconds_tens place toggled');
    scrollTimeDown('#seconds_tens');
});
$('#seconds_ones .down-arrow').click(function() {
    console.log('seconds_ones place toggled');
    scrollTimeDown('#seconds_ones');
});

//Event Listeners
    //Listen for Tab-Focus Locations
        //Digit Place
let currentDigitPlace = 0;

function adjustDigitPlace() {
    $('#hours_tens .digit').focus(function() {
        currentDigitPlace = 1;
        console.log('currentSlot:', currentDigitPlace)
    });
    $('#hours_ones .digit').focus(function() {
        currentDigitPlace = 2;
        console.log('currentSlot:', currentDigitPlace)
    });
    $('#minutes_tens .digit').focus(function() {
        currentDigitPlace = 3;
        console.log('currentSlot:', currentDigitPlace)
    });
    $('#minutes_ones .digit').focus(function() {
        currentDigitPlace = 4;
        console.log('currentSlot:', currentDigitPlace)
    });
    $('#seconds_tens .digit').focus(function() {
        currentDigitPlace = 5;
        console.log('currentSlot:', currentDigitPlace)
    });
    $('#seconds_ones .digit').focus(function() {
        currentDigitPlace = 6;
        console.log('currentSlot:', currentDigitPlace)
    });
}
adjustDigitPlace();

//Scroll Functions
let functionLock = false; //has global scope

function scrollOptionLeft() {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('initiated scrollOptionLeft()')
    
    //Animation Portion
    $('.hidden-option-left').addClass('grow-option-from-left');
    $('.option-left').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-right');
    $('.option-right').addClass('shrink-option-to-right');

    //Restructuring DOM
    setTimeout(function() {
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'left'));
        functionLock = false;
    }, 320);
}

function scrollOptionRight() {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('initiated scrollOptionRight()')
    
    //Animation Portion
    $('.hidden-option-right').addClass('grow-option-from-right');
    $('.option-right').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-left');
    $('.option-left').addClass('shrink-option-to-left');

    //Restructuring DOM
    setTimeout(function() {        
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'right'));
        functionLock = false;
    }, 320);
}

function scrollTimeUp(location) {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('toggled Time Up');

    //Time Algorithm + Prevent False Times 
    let currentTime = $(`${location} .digit`).children().text();
    currentTime++;

    if(location == '#seconds_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            scrollTimeUp('#seconds_tens');
        }, 160);
    }
    if(location == '#seconds_tens' && currentTime > 5) {
        currentTime = 0;
        setTimeout(function() {
            scrollTimeUp('#minutes_ones');
        }, 160);
    }
    if(location == '#minutes_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            adjustTimeUp('#minutes_tens');
        }, 160);
    }
    if(location == '#minutes_tens' && currentTime > 5) {
        currentTime = 0;
        setTimeout(function() {
            adjustTimeUp('#hours_ones');
        }, 160);
    }    
    if(location == '#hours_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            adjustTimeUp('#hours_tens');
        }, 160);
    };
    if(location == '#hours_tens' && currentTime > 9) {
        currentTime = 0;  
    };    

    //Animation Portion
    $(`${location} .digit`).animate({
        height: '0em',
        fontSize: '0em'
    }, 150);
    $(`${location} .digit-spacer`).prepend(`<div class="grow-time" tabindex="${currentDigitPlace}"><p>${currentTime}<p></div>`);
    
    //Restructuring DOM
    setTimeout(function() {
        $(`${location} .digit`).remove();
        $(`${location} .grow-time`).addClass('digit');
        $(`${location} .digit`).removeClass('grow-time');
        $(`${location} .digit`).children().last().remove();
        adjustDigitPlace();
        $(`${location} .digit`).focus();
        functionLock = false;
    }, 150);
}

function scrollTimeDown(location) {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('toggled Time Down') 
    
    //Time Algorithm + Prevent False Times
    let locationHead = location.split(' ')[0]

    let currentTime = $(`${location} .digit`).children().text();
    currentTime--;

    if(locationHead == '#seconds_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            adjustTimeDown('#seconds_tens');
        }, 160);
    }
    if(locationHead == '#seconds_tens' && currentTime < 0) {
        currentTime = 5;
        setTimeout(function() {
            adjustTimeDown('#minutes_ones');
        }, 160);
    }
    if(locationHead == '#minutes_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            adjustTimeDown('#minutes_tens');
        }, 160);
    }
    if(locationHead == '#minutes_tens' && currentTime < 0) {
        currentTime = 5;
        setTimeout(function() {
            adjustTimeDown('#hours_ones');
        }, 160);
    }    
    if(locationHead == '#hours_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            adjustTimeDown('#hours_tens');
        }, 160);
    };
    if(locationHead == '#hours_tens' && currentTime < 0) {
        currentTime = 9;  
    };  

    //Animation Portion
    $(`${location} .digit`).animate({
        height: '0em',
        fontSize: '0em',
    }, 150);
    $(`${location} .digit-spacer`).append(`<div class="grow-time" tabindex="${currentDigitPlace}"><p>${currentTime}<p></div>`);
    
    //Restructuring DOM
    setTimeout(function() {
        $(`${location} .digit`).remove();
        $(`${location} .grow-time`).addClass('digit');
        $(`${location} .digit`).removeClass('grow-time');
        $(`${location} .digit`).children().last().remove();
        adjustDigitPlace();
        $(`${location} .digit`).focus();
        functionLock = false;
    }, 150);

}

//Scroll Support Functions
    //Manipulate Stage
let stage = 'taskOptions';
let stages = ['taskOptions', 'taskTime', 'runClock'];

function advanceStage() {
    $('#options').remove();
    $('#time').removeClass('invisible');
    $('#time').addClass('flex');
    $('.toggle-left-arrow').addClass('invisible');
    $('.toggle-right-arrow').addClass('invisible');
    $('.prompt h1').text('How long would you like to do this for?');
    $('.prompt h1').css('margin-bottom', '2.5em');
    stage = stages[1];
}

function regressStage() {
    stage = 'tastOptions'
}
//Scroll Support Functions
    //Reset DOM after Animation
function clearOptions() {
    $('.hidden-option-left').remove();
    $('.option-left').remove();
    $('.option-main').remove();
    $('.option-right').remove();
    $('.hidden-option-right').remove();   
    console.log('cleared Options');
}

function resetOptions(optionInFocus, options, direction) {
    const numOfOptions = options.length;
    if (numOfOptions == 0) return undefined; 

    optionsRepeated = [...options, ...options, ...options, ...options, ...options, ...options,...options];
    let focalIndex = optionsRepeated.indexOf(optionInFocus, 3);

    if(direction == 'left') focalIndex -= 1;
    if(direction == 'right') focalIndex += 1;

    optionMain = optionsRepeated[focalIndex];

    console.log('options Reset');

    //Trigger advanceStage Function
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
