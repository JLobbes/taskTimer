//Table of Contents
    //Make Sure jQuery is Working
    //Trigger Toggle Functions
    //Toggle Functions
        //ToggleRight
        //ToggleLeft
    //Toggle Support Functions
        //Reset DOM after Animation
            //clearOptions Div
            //resetOptions Div


//Make Sure jQuery is Working
$( document ).ready(function() {
    console.log('jQueary has successfully loaded')

    clearOptions();
    $('#options').append(resetOptions(optionMain, myOptions, 'right'));
  });


//Trigger Toggle Functions
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       toggleLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       toggleRight();
    }
}

$(document).ready(function() {
    $('.toggle-right-arrow').click(function () {
        toggleRight();
    });
    $('.toggle-left-arrow').click(function() {
        toggleLeft();
    });
});


//Toggle Functions
function toggleRight() {
    console.log('initiated toggleRight()')
    
    //Animation Portion
    $('.hidden-left').addClass('grow-from-left');
    $('.option-left').addClass('occupy-middle');
    $('.option-main').addClass('occupy-right');
    $('.option-right').addClass('shrink-to-right');

    //Restructuring DOM
    setTimeout(function() {
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'right'));
    }, 320);
}

function toggleLeft() {
    console.log('initiated toggleRight()')
    
    //Animation Portion
    $('.hidden-right').addClass('grow-from-right');
    $('.option-right').addClass('occupy-middle');
    $('.option-main').addClass('occupy-left');
    $('.option-left').addClass('shrink-to-left');

    //Restructuring DOM

    setTimeout(function() {        
        clearOptions();
        $('#options').append(resetOptions(optionMain, myOptions, 'left'));
    }, 320);
}

//Toggle Support Functions
    //Restructure DOM after Animation
function clearOptions() {
    $('.hidden-left').remove();
    $('.option-left').remove();
    $('.option-main').remove();
    $('.option-right').remove();
    $('.hidden-right').remove();   
    console.log('cleared Options')
}

function resetOptions(optionInFocus, options, direction) {
    const numOfOptions = options.length
    if (numOfOptions == 0) return undefined; 



    optionsRepeated = [...options, ...options, ...options, ...options, ...options, ...options,...options];
    let focalIndex = optionsRepeated.indexOf(optionInFocus, 3);

    if(direction == 'left') focalIndex += 1;
    if(direction == 'right') focalIndex -= 1;

    optionMain = optionsRepeated[focalIndex];

    console.log('options Reset')
    return `<div class="hidden-left center-text"><p>${optionsRepeated[focalIndex - 2]}</p></div>
            <div class="option-left center-text"><p>${optionsRepeated[focalIndex - 1]}</p></div>
            <div class="option-main center-text" ><p>${optionsRepeated[focalIndex]}</p></div>
            <div class="option-right center-text"><p>${optionsRepeated[focalIndex + 1]}</p></div>
            <div class="hidden-right center-text"><p>${optionsRepeated[focalIndex + 2]}</p></div>`;
};

let optionMain = 'WORK';
let myOptions = ['WORK', 'NETFLIX', 'JAZZ'];

