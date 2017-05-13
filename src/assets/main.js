let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value == '' && attempt.value == '') {
        answer.value = setHiddenFields();
    }
    if (!validateInput(input.value)) 
        return false;
    attempt.value++;
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
    }
    else {
        if (attempt.value >= 10) {
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        }
        else {
            setMessage('Incorrect, try again.');
        }
    }
}

function setHiddenFields() {
    attempt.value = 0;
    let random = Math.floor(Math.random() * 10000).toString();
    log('random', random);
    while (random.length < 4) {
        random = '0' + random;
    }
    log('paddedRandom', random);
    return random;

}
function setMessage(message) {
    $('#message').html(message);
}
function validateInput(input) {
    if (input.length == 4) {
        return true;
    }
    else {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}
function getResults(input) {
    let correctCharaters = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (i = 0; i < input.length; i++) {
        if (input.charAt(i) == answer.value.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correctCharaters++;
        }
        else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';
    $("#results").append(html);
    return correctCharaters == 4;
}
function showAnswer(success) {
    var $code = $("#code");
    $code.html(answer.value);
    if (success) $code.className += ' success';
    else $code.className += ' failure';
}
function showReplay() {
    $("#guessing-div").style.display = 'none';
    $("#replay-div").style.display = 'block';
}
function log(key, data) {
    console.log(key + ": " + data);
}
