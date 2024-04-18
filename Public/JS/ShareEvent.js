document.getElementById("shareButton").addEventListener("click", function() {

    var currentPageUrl = window.location.href; 
    var Message = "Check out this Event: " + currentPageUrl;

    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(Message));

    // Add more social media platforms as needed

    // window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(imageUrl));
    // window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(imageUrl));
    // window.open("https://www.linkedin.com/shareArticle?url=" + encodeURIComponent(imageUrl));
    
});