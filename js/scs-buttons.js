$(document).ready(function () {

    // Scion Scheme
    
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

    // Treehouse

    $("#treehouse-homepage-link-container").on("mouseenter", function() {
        $("#treehouse-homepage-link").css({"display":"none"});        
        $("#treehouse-homepage-link-alt").css({"display":"block"});
        $("#treehouse-homepage-link-container").css({"border-radius":"0.5rem", "box-shadow":" 0px 0px 1px 1px #000000", "background-image":"linear-gradient(315deg, #375491 25%, #4ba366 50%, #9e822d 75%, #c05971 100%)"});
    });

    $("#treehouse-homepage-link-container").on("mouseleave", function() {
        $("#treehouse-homepage-link").css({"display":"block"});        
        $("#treehouse-homepage-link-alt").css({"display":"none"});
        $("#treehouse-homepage-link-container").css({"box-shadow":"none","background-image":"none"});
    });
    // Netmatters

    $("#netmatters-homepage-link-container").on("mouseenter", function() {
        $("#netmatters-homepage-link").css({"display":"none"});        
        $("#netmatters-homepage-link-alt").css({"display":"block"});
        $("#netmatters-homepage-link-container").css({"box-shadow":"0.2rem 0.2rem 0.3rem 0.3rem #00000033", "background-image":"linear-gradient(315deg, #441144 25%, #4b6a9f 50%, #3b6539 75%, #210505 100%)"});
    });

    $("#netmatters-homepage-link-container").on("mouseleave", function() {
        $("#netmatters-homepage-link").css({"display":"block"});        
        $("#netmatters-homepage-link-alt").css({"display":"none"});
        $("#netmatters-homepage-link-container").css({"box-shadow":"none","background-image":"none"});
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