$(document).ready(function () {    
    
    $("#scion-homepage-link-container").on("mouseenter", function() {
        $("#scion-homepage-link").css({"display":"none"});        
        $("#scion-homepage-link-alt").css({"display":"block"});
        $("#scion-homepage-link-container").css({"box-shadow":"0.2rem 0.2rem 0.3rem 0.3rem #00000033", "background-image":"linear-gradient(315deg, #441144 25%, #4b6a9f 50%, #3b6539 75%, #210505 100%)"});
    });

    $("#scion-homepage-link-container").on("mouseleave", function() {
        $("#scion-homepage-link").css({"display":"block"});        
        $("#scion-homepage-link-alt").css({"display":"none"});
        $("#scion-homepage-link-container").css({"box-shadow":"none","background-image":"none"});
    });

    $("#scion-homepage-link-container").click(function() {
        window.open('https://www.netmatters.co.uk/train-for-a-career-in-tech', '_blank');
    });

    $("#treehouse-homepage-link-container").click(function() {
        window.open('https://www.teamtreehouse.com', '_blank');
    });

    $("#netmatters-homepage-link-container").click(function() {
        window.open('https://www.netmatters.co.uk', '_blank');
    });
});