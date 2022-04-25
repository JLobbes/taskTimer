//Table of Contents
    //Make Sure jQuery is Working
    //Event Listeners
        //Listen for Keypress
            //checkKey()
        //Listen for Arrow Button Clicks
            //Left & Right Option Arrow
            //Up & Down Digit Arros
        //Listen for Tab-Focus Location
            //Option Place
                //adjustOptionPlace()
            //Digit Place
                //adjustDigitPlace()
        //Listen for Timer Operation
            // 
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
        //Prompt User
            //displayDigitPlace()
    //Clock Interface
        //gatherTime()
        //countDown()
        //start()
        //pause()
        //alarm()




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
        if(stage == 'taskOptions') scrollOptionLeft();
        if(stage == 'taskTime') {
            //This snippet can be written as a function
            let digitPlaces = document.getElementsByClassName('digit');
            let active = document.activeElement;
            for(let i = 0; i < digitPlaces.length; i++) {
                if(digitPlaces[i] == active) {
                    $(digitPlaces[i - 1]).focus();
                }
            }            
        }
    }
    else if (e.keyCode == '39') {
        // right arrow
        if(stage == 'taskOptions') scrollOptionRight();
        if(stage == 'taskTime') {
            //This snippet can be written as a function
            let digitPlaces = document.getElementsByClassName('digit');
            let active = document.activeElement;
            for(let i = 0; i < digitPlaces.length; i++) {
                if(digitPlaces[i] == active) {
                    $(digitPlaces[i + 1]).focus();
                }
            }
        }
    }
    else if (e.keyCode == '13') {
        //enterKey
        if(currentOptionPlace != 0 || currentDigitPlace != 0) advanceStage();
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
    scrollTimeUp('#hours_tens');
});
$('#hours_ones .up-arrow').click(function() {
    scrollTimeUp('#hours_ones');
});
$('#minutes_tens .up-arrow').click(function() {
    scrollTimeUp('#minutes_tens');
});
$('#minutes_ones .up-arrow').click(function() {
    scrollTimeUp('#minutes_ones');
});
$('#seconds_tens .up-arrow').click(function() {
    scrollTimeUp('#seconds_tens');
});
$('#seconds_ones .up-arrow').click(function() {
    scrollTimeUp('#seconds_ones');
});
$('#hours_tens .down-arrow').click(function() {
    scrollTimeDown('#hours_tens');
});
$('#hours_ones .down-arrow').click(function() {
    scrollTimeDown('#hours_ones');
});
$('#minutes_tens .down-arrow').click(function() {
    scrollTimeDown('#minutes_tens');
});
$('#minutes_ones .down-arrow').click(function() {
    scrollTimeDown('#minutes_ones');
});
$('#seconds_tens .down-arrow').click(function() {
    scrollTimeDown('#seconds_tens');
});
$('#seconds_ones .down-arrow').click(function() {
    scrollTimeDown('#seconds_ones');
});


//Event Listeners
    //Listen for Tab-Focus Locations
        //Option Place
let currentOptionPlace = 0

function adjustOptionPlace() {
    $('.option-main').focus(function() {
        currentOptionPlace = 1;
    });
    $('.option-right').focus(function() {
        currentOptionPlace = 2;
    });
    $('.option-left').focus(function() {
        currentOptionPlace = 3;
    });
}
adjustOptionPlace();

        //Digit Place
let currentDigitPlace = 0;

function adjustDigitPlace() {
    $('#hours_tens .digit').focus(function() {
        currentDigitPlace = 1;
    });
    $('#hours_ones .digit').focus(function() {
        currentDigitPlace = 2;
    });
    $('#minutes_tens .digit').focus(function() {
        currentDigitPlace = 3;
    });
    $('#minutes_ones .digit').focus(function() {
        currentDigitPlace = 4;
    });
    $('#seconds_tens .digit').focus(function() {
        currentDigitPlace = 5;
    });
    $('#seconds_ones .digit').focus(function() {
        currentDigitPlace = 6;
    });
}
adjustDigitPlace();

//Event Listeners
    //Listen for Timer Operation

$('#start').click(function() {
    start();
});

$('#pause').click(function() {
    pause();
});

//Scroll Functions
let functionLock = false; //has global scope

function scrollOptionLeft() {
    if(functionLock == true) return undefined;
    functionLock = true;
    
    //Animation Portion
    $('.hidden-option-left').addClass('grow-option-from-left');
    $('.option-left').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-right');
    $('.option-right').addClass('shrink-option-to-right');

    //Restructuring DOM
    setTimeout(function() {
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'left'));
        $('.option-main').focus();
        currentOptionPlace = 1;
        functionLock = false;
    }, 320);
}

function scrollOptionRight() {
    if(functionLock == true) return undefined;
    functionLock = true;
    
    //Animation Portion
    $('.hidden-option-right').addClass('grow-option-from-right');
    $('.option-right').addClass('occupy-option-middle');
    $('.option-main').addClass('occupy-option-left');
    $('.option-left').addClass('shrink-option-to-left');

    //Restructuring DOM
    setTimeout(function() {        
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'right'));
        $('.option-main').focus();
        currentOptionPlace = 1;
        functionLock = false;
    }, 320);
}

function scrollTimeUp(location) {
    if(functionLock == true) return undefined;
    functionLock = true;

    //Prevent False Times 
    let currentTime = $(`${location} .digit`).children().text();
    currentTime++;

    if(location == '#seconds_ones' && currentTime > 9) {
        currentTime = 0;
    }
    if(location == '#seconds_tens' && currentTime > 5) {
        currentTime = 0;
    }
    if(location == '#minutes_ones' && currentTime > 9) {
        currentTime = 0;
    }
    if(location == '#minutes_tens' && currentTime > 5) {
        currentTime = 0;
    }    
    if(location == '#hours_ones' && currentTime > 9) {
        currentTime = 0;
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
    
    //Prevent False Times
    let locationHead = location.split(' ')[0]

    let currentTime = $(`${location} .digit`).children().text();
    currentTime--;

    if(locationHead == '#seconds_ones' && currentTime < 0) {
        currentTime = 9;
    }
    if(locationHead == '#seconds_tens' && currentTime < 0) {
        currentTime = 5;
    }
    if(locationHead == '#minutes_ones' && currentTime < 0) {
        currentTime = 9;
    }
    if(locationHead == '#minutes_tens' && currentTime < 0) {
        currentTime = 5;
    }    
    if(locationHead == '#hours_ones' && currentTime < 0) {
        currentTime = 9;
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
    if(stage == 'taskOptions') {
        $('#options').remove();
        $('#time').removeClass('invisible');
        $('#time').addClass('flex');
        $('.toggle-left-arrow').addClass('invisible');
        $('.toggle-right-arrow').addClass('invisible');
        $('.prompt h1').text('How long would you like to do this for?');
        $('.prompt h1').css('margin-bottom', '2.5em');
        stage = 'taskTime';
        
    } else if(stage == 'taskTime') {
        $('.up-arrow').css('display','none');
        $('.down-arrow').css('display','none');
        $('.prompt h1').text('Your timer will end at ...');
        $('.prompt h1').css('margin-bottom', '0.5em');
        $('#clock_operations').css('display','flex  ');
        $('#start').focus();
        functionLock = true;
    }
}

function regressStage() {
    if(stage == 'taskTime') stage = 'taskOptions'
}
//Scroll Support Functions
    //Reset DOM after Animation
function clearOptions() {
    $('.hidden-option-left').remove();
    $('.option-left').remove();
    $('.option-main').remove();
    $('.option-right').remove();
    $('.hidden-option-right').remove();   
}

function resetOptions(optionInFocus, options, direction) {
    const numOfOptions = options.length;
    if (numOfOptions == 0) return undefined; 

    optionsRepeated = [...options, ...options, ...options, ...options, ...options, ...options,...options];
    let focalIndex = optionsRepeated.indexOf(optionInFocus, 3);

    if(direction == 'left') focalIndex -= 1;
    if(direction == 'right') focalIndex += 1;

    optionMain = optionsRepeated[focalIndex];

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
        adjustOptionPlace();
    });    

    return `<div class="hidden-option-left center-text"><p>${optionsRepeated[focalIndex - 2]}</p></div>
            <div class="option-left center-text" tabindex='3'><p>${optionsRepeated[focalIndex - 1]}</p></div>
            <div class="option-main center-text" tabindex='1'><p>${optionsRepeated[focalIndex]}</p></div>
            <div class="option-right center-text" tabindex='2'><p>${optionsRepeated[focalIndex + 1]}</p></div>
            <div class="hidden-option-right center-text"><p>${optionsRepeated[focalIndex + 2]}</p></div>`;
};

let optionMain = 'A';
let myOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Clock Functions

function gatherTime() {

    let hours = parseInt(($('#hours_tens .digit').children().text()) + ($('#hours_ones .digit').children().text()))
    let minutes = parseInt(($('#minutes_tens .digit').children().text()) + ($('#minutes_ones .digit').children().text()))
    let seconds = parseInt(($('#seconds_tens .digit').children().text()) + ($('#seconds_ones .digit').children().text()))
    let total = (seconds) + (minutes * 60) + (hours * 360)
    console.log('total:', total)
    if(total == 0) {
        pause();
        alarm();
    };
    return total;
}

function countDown(location) {
    if(functionLock == true) return undefined;
    functionLock = true;
    
    //Prevent False Times
    let currentDigit = $(`${location} .digit`).children().text();
    let newDigit = currentDigit -= 1;

    if(location == '#seconds_ones' && newDigit < 0) {
        newDigit = 9;
        setTimeout(function() {
            countDown('#seconds_tens');
        }, 160);
    }
    if(location == '#seconds_tens' && newDigit < 0) {
        newDigit = 5;
        setTimeout(function() {
            countDown('#minutes_ones');
        }, 160);
    }
    if(location == '#minutes_ones' && newDigit < 0) {
        newDigit = 9;
        setTimeout(function() {
            countDown('#minutes_tens');
        }, 160);
    }
    if(location == '#minutes_tens' && newDigit < 0) {
        newDigit = 5;
        setTimeout(function() {
            countDown('#hours_ones');
        }, 160);
    }    
    if(location == '#hours_ones' && newDigit < 0) {
        newDigit = 9;
        setTimeout(function() {
            countDown('#hours_tens');
        }, 160);
    };
    if(location == '#hours_tens' && newDigit < 0) {
        newDigit = 9;  
    };  

    //Animation Portion
    $(`${location} .digit`).animate({
        height: '0em',
        fontSize: '0em',
    }, 150);
    $(`${location} .digit-spacer`).append(`<div class="grow-time""><p>${newDigit}<p></div>`);
    
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


let clockRefreshInterval = 0;
let checkRemainingTime = 0
let clockPower = false;

function start() {
    if(clockPower == false) {
        functionLock = false;
        clockPower = true;
        countDown('#seconds_ones');
        checkRemainingTime = setInterval(gatherTime, 1000);
        clockRefreshInterval = setInterval(countDown, 1000, '#seconds_ones');

        $('#start').css('box-shadow','none');
        $('#pause').css('box-shadow','0 0 0.5em black');
    }
}

function pause() {
    if(clockPower == true) {
        clockPower = false;
        clearInterval(clockRefreshInterval);
        clearInterval(checkRemainingTime);

        $('#pause').css('box-shadow','none');
        $('#start').css('box-shadow','0 0 0.5em black');
    }
}

function alarm() {
    let tiger = document.getElementById('myAudio');
    tiger.play()
    setTimeout(function() {
        alert('Your Task Has Completed!!')
    }, 50);
}

