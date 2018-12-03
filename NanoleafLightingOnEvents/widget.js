let fieldData, url;
let items = {
    "SETshirt": {
        "effect": "Nemo",
        "time": 2,
    },
    "ItemNameWihtoutSpaces": {
        "effect": "Nemo",
        "time": 2,
    },
};

window.addEventListener('onEventReceived', function (obj) {

    if (typeof obj.detail.event.listener === "undefined") return;
    const listener = obj.detail.event.listener.split("-");
    if (typeof listener === "undefined") return;
    if (listener[1] !== "latest") return;
    let item;
    if (listener[0] === "redemption") {
        item = obj.detail.event.event.item;
        item = item.replace(/\W/g, '');
    }
    light(listener[0], item);
});
window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    url = 'http://' + fieldData['ip'] + ':16021/api/v1/' + fieldData['token'] + '/effects'; // your api url
});

function light(event, name = "") {
    let effect = "", time = 0;
    if (event === "redemption") {
        if (typeof items[name] === "undefined") return;
        effect = items[name]["effect"];
        time = items[name]["time"];
    } else {
        effect = fieldData[event + "Effect"];
        time = fieldData[event + "Time"];
    }
    if (effect === "" || time === 0) return;
    $.ajax({
        url: url,
        method: 'PUT',
        data: JSON.stringify({"select": effect}),
        processData: false,
        contentType: 'application/json',
        success: function () {
            setTimeout(function () {
                $.ajax({
                    url: url,
                    method: 'PUT',
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify({"select": fieldData["defaultEffect"]}),
                });
            }, time * 1000);
        }
    });
}
