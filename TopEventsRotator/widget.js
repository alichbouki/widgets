let userCurrency;
let userLocale = "en-US";
let animationIn = 'bounceIn';
let animationOut = 'bounceOut';
let box;
let amount = 0;
let next = 0;
let timeIn = 400;
let timeDisplay = 2500;
let timeOut = 500;
let delay = 5000;
let timeBetween = 500;
let slideTime = timeIn + timeDisplay + timeOut + timeBetween;
$(document).ready(function () {
    box = $(".mySlides");
    amount = box.length;
    showSlide(next);
});


function showSlide(i) {
    next++;
    $(box[i])
        .addClass(animationIn + ' animated', timeIn)
        .show(0, timeIn + timeOut)
        .removeClass(animationIn, timeDisplay)
        .addClass(animationOut, timeOut)
        .removeClass(animationOut + " animated", timeOut + 500)
        .hide(0, timeOut)
        .queue(function () {
            if (next >= amount) {
                next = 0;
                setTimeout(function () {
                    showSlide(next)
                }, delay);
            } else {
                showSlide(next)
            }
            $(this).dequeue();
        })
    ;

}

window.addEventListener('onSessionUpdate', e => {
    const data = e.detail.session;
    $("#top-donator").text(data["tip-session-top-donator"]["name"] + " - " + data["tip-session-top-donator"]["amount"]);
    $("#top-cheerer").text(data["cheer-session-top-donator"]["name"] + " - " + data["cheer-session-top-donator"]["amount"]);
    $("#recent-donator").val(data["tip-latest"]["name"] + ": " + data["tip-latest"]["amount"]);
});

window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj["detail"]["session"]["data"];
    const fieldData = obj.detail.fieldData;
    animationIn = fieldData['animationIn'];
    animationOut = fieldData['animationOut'];
    timeIn = fieldData['timeIn'];
    timeDisplay = fieldData['timeDisplay'];
    timeOut = fieldData['timeOut'];
    delay = fieldData['delay'];
    timeBetween = fieldData['delay'];
    userCurrency = obj.detail.currency;

    slideTime = timeIn + timeDisplay + timeOut;
    $("#recent-donator").text(data["tip-latest"]["name"] + " - " + data["tip-latest"]["amount"]);
    $("#top-donator").text(data["tip-session-top-donator"]["name"] + " - " + data["tip-session-top-donator"]["amount"]);
    $("#top-cheerer").text(data["cheer-session-top-donator"]["name"] + " - " + data["cheer-session-top-donator"]["amount"]);

});
