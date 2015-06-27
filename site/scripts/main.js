//custom javascript
$(document).foundation();

var experience = {
    html: 36,
    css: 36,
    javascript: 36,
    java: 60,
    ruby: 2,
    php: 36,
    python: 1,
    jquery: 24,
    angular: 6
};

var data = [
    {
        value: 60,
        color:"#FF6B63",
        highlight: "#FF5A5E",
        label: "Active"
    },
    {
        value: 40,
        color: "#CACACA",
        highlight: "#B3B3B3",
        label: "Inactive"
    }
];

var navigation = $("header > div.fixed");
var ctx        = $("#myChart").get(0).getContext("2d");
var expChart   = new Chart(ctx).Doughnut(data, {percentageInnerCutout: 75});

var chartExp = function(obj){
    var lang    = $(obj).data("lang");
    var key     = lang.toLowerCase();
    var percent = (experience[key] / (5 * 12)) * 100;
    var years   = (experience[key] / 12);

    expChart.segments[0].value = percent;
    expChart.segments[1].value = 100 - percent;
    expChart.update();

    if (years < 1) {
        if (experience[key] == 1) {
            $("#chart_txt_cntr h1 strong").text(experience[key] + " month");
        } else {
            $("#chart_txt_cntr h1 strong").text(experience[key] + " months");
        }
    } else if (years == 1) {
        $("#chart_txt_cntr h1 strong").text(years + " year");
    } else {
        $("#chart_txt_cntr h1 strong").text(years + " years");
    }

    $("#chart_txt_cntr h2").text(lang);

    return false;
};

var s = skrollr.init({
    render: function(data) {
        //Debugging - Log the current scroll position.
        //console.log(data.curTop);
    }
});

var scrollToTop = function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
};

var scrollToBottom = function() {
    $('html, body').animate({scrollTop: $(document).height()}, 'slow');
    return false;
};

window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn  = 190;

    if (distanceY > shrinkOn && navigation.has("large")) {
        navigation.removeClass("large");
    } else {
        navigation.addClass("large");
    }
});