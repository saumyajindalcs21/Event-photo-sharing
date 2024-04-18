var CopyButton = document.getElementById('CopyButton');

CopyButton.addEventListener('click',()=>{

    var textToCopy = document.getElementById("textToCopy");
    textToCopy.value=window.location.href;
    textToCopy.select();
    document.execCommand("copy");
    textToCopy.blur();
    alert("Text copied to clipboard: " + textToCopy.value);

});

