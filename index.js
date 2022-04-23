//Table of Contents
    //Make Sure jQuery is Working
    //Event Listeners to Trigger Toggle Functions
    //Toggle Functions
        //ToggleOptionRight
        //ToggleOptionLeft
        //ToggleTimeUp
        //ToggleTimeDown
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

    //Listen for Which Key
    e = e || window.event;
    if (e.keyCode == '38') {
        //up arrow
        if(currentSlot == 1) toggleTimeUp('#hours_tens');
        if(currentSlot == 2) toggleTimeUp('#hours_ones');
        if(currentSlot == 3) toggleTimeUp('#minutes_tens');
        if(currentSlot == 4) toggleTimeUp('#minutes_ones');
        if(currentSlot == 5) toggleTimeUp('#seconds_tens');
        if(currentSlot == 6) toggleTimeUp('#seconds_ones');
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(currentSlot == 1) toggleTimeDown('#hours_tens');
        if(currentSlot == 2) toggleTimeDown('#hours_ones');
        if(currentSlot == 3) toggleTimeDown('#minutes_tens');
        if(currentSlot == 4) toggleTimeDown('#minutes_ones');
        if(currentSlot == 5) toggleTimeDown('#seconds_tens');
        if(currentSlot == 6) toggleTimeDown('#seconds_ones');
    }
    else if (e.keyCode == '37') {
       // left arrow
       toggleOptionLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       toggleOptionRight();
    }
}

$('.toggle-right-arrow').click(function () {
    toggleOptionRight();
});
$('.toggle-left-arrow').click(function() {
    toggleOptionLeft();
});

    //Differentiate for digit place
$('#hours_tens .up-arrow').click(function() {
    console.log('hours_tens place toggled')
    toggleTimeUp('#hours_tens');
});
$('#hours_ones .up-arrow').click(function() {
    console.log('hours_ones place toggled')
    toggleTimeUp('#hours_ones');
});
$('#minutes_tens .up-arrow').click(function() {
    console.log('minutes_tens place toggled')
    toggleTimeUp('#minutes_tens');
});
$('#minutes_ones .up-arrow').click(function() {
    console.log('minutes_ones place toggled')
    toggleTimeUp('#minutes_ones');
});
$('#seconds_tens .up-arrow').click(function() {
    console.log('seconds_tens place toggled')
    toggleTimeUp('#seconds_tens');
});
$('#seconds_ones .up-arrow').click(function() {
    console.log('seconds_ones place toggled')
    toggleTimeUp('#seconds_ones');
});
$('#hours_tens .down-arrow').click(function() {
    console.log('hours_tens place toggled');
    toggleTimeDown('#hours_tens');
});
$('#hours_ones .down-arrow').click(function() {
    console.log('hours_ones place toggled');
    toggleTimeDown('#hours_ones');
});
$('#minutes_tens .down-arrow').click(function() {
    console.log('minutes_tens place toggled');
    toggleTimeDown('#minutes_tens');
});
$('#minutes_ones .down-arrow').click(function() {
    console.log('minutes_ones place toggled');
    toggleTimeDown('#minutes_ones');
});
$('#seconds_tens .down-arrow').click(function() {
    console.log('seconds_tens place toggled');
    toggleTimeDown('#seconds_tens');
});
$('#seconds_ones .down-arrow').click(function() {
    console.log('seconds_ones place toggled');
    toggleTimeDown('#seconds_ones');
});

let currentSlot = 0;

function adjustSlot() {
    $('#hours_tens .digit').focus(function() {
        currentSlot = 1;
        console.log('currentSlot:', currentSlot)
    });
    $('#hours_ones .digit').focus(function() {
        currentSlot = 2;
        console.log('currentSlot:', currentSlot)
    });
    $('#minutes_tens .digit').focus(function() {
        currentSlot = 3;
        console.log('currentSlot:', currentSlot)
    });
    $('#minutes_ones .digit').focus(function() {
        currentSlot = 4;
        console.log('currentSlot:', currentSlot)
    });
    $('#seconds_tens .digit').focus(function() {
        currentSlot = 5;
        console.log('currentSlot:', currentSlot)
    });
    $('#seconds_ones .digit').focus(function() {
        currentSlot = 6;
        console.log('currentSlot:', currentSlot)
    });
}
adjustSlot();

//Toggle Functions
let functionLock = false; //has global scope

function toggleOptionLeft() {
    if(functionLock == true) return undefined;
    functionLock = true;
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
        functionLock = false;
    }, 320);
}

function toggleOptionRight() {
    if(functionLock == true) return undefined;
    functionLock = true;
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
        functionLock = false;
    }, 320);
}

function toggleTimeUp(location) {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('toggled Time Up');

    //Time Algorithm 
    let currentTime = $(`${location} .digit`).children().text();
    currentTime++;

    if(location == '#seconds_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            toggleTimeUp('#seconds_tens');
        }, 160);
    }
    if(location == '#seconds_tens' && currentTime > 5) {
        currentTime = 0;
        setTimeout(function() {
            toggleTimeUp('#minutes_ones');
        }, 160);
    }
    if(location == '#minutes_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            toggleTimeUp('#minutes_tens');
        }, 160);
    }
    if(location == '#minutes_tens' && currentTime > 5) {
        currentTime = 0;
        setTimeout(function() {
            toggleTimeUp('#hours_ones');
        }, 160);
    }    
    if(location == '#hours_ones' && currentTime > 9) {
        currentTime = 0;
        setTimeout(function() {
            toggleTimeUp('#hours_tens');
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
    $(`${location} .digit-spacer`).prepend(`<div class="grow-time" tabindex="${currentSlot}"><p>${currentTime}<p></div>`);
    
    //Restructuring DOM
    setTimeout(function() {
        $(`${location} .digit`).remove();
        $(`${location} .grow-time`).addClass('digit');
        $(`${location} .digit`).removeClass('grow-time');
        $(`${location} .digit`).children().last().remove();
        adjustSlot();
        $(`${location} .digit`).focus();
        functionLock = false;
    }, 150);
}

function toggleTimeDown(location) {
    if(functionLock == true) return undefined;
    functionLock = true;
    console.log('toggled Time Down') 
    
    //Time Algorithm 
    let locationHead = location.split(' ')[0]

    let currentTime = $(`${location} .digit`).children().text();
    currentTime--;

    if(locationHead == '#seconds_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            toggleTimeDown('#seconds_tens');
        }, 160);
    }
    if(locationHead == '#seconds_tens' && currentTime < 0) {
        currentTime = 5;
        setTimeout(function() {
            toggleTimeDown('#minutes_ones');
        }, 160);
    }
    if(locationHead == '#minutes_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            toggleTimeDown('#minutes_tens');
        }, 160);
    }
    if(locationHead == '#minutes_tens' && currentTime < 0) {
        currentTime = 5;
        setTimeout(function() {
            toggleTimeDown('#hours_ones');
        }, 160);
    }    
    if(locationHead == '#hours_ones' && currentTime < 0) {
        currentTime = 9;
        setTimeout(function() {
            toggleTimeDown('#hours_tens');
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
    $(`${location} .digit-spacer`).append(`<div class="grow-time" tabindex="${currentSlot}"><p>${currentTime}<p></div>`);
    
    //Restructuring DOM
    setTimeout(function() {
        $(`${location} .digit`).remove();
        $(`${location} .grow-time`).addClass('digit');
        $(`${location} .digit`).removeClass('grow-time');
        $(`${location} .digit`).children().last().remove();
        adjustSlot();
        $(`${location} .digit`).focus();
        functionLock = false;
    }, 150);

}


//Toggle Support Functions
    //Restructure DOM after Animation
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
