var GenQr = document.getElementById('GenQr');
var ImageDiv = document.getElementById('qrcode-container');

var currentPageUrl = window.location.href;

var qr = qrcode(0, 'M');
qr.addData(currentPageUrl);
qr.make();

var qrImageDataURI = qr.createDataURL();
var qrImage = document.getElementById('QrImage');
var Qr_a = document.getElementById('Qr-a');
qrImage.src = qrImageDataURI;
Qr_a.href = qrImageDataURI;
document.getElementById('qrcode-container').appendChild(qrImage);

GenQr.addEventListener('click',()=>{
   if (ImageDiv.style.visibility === "visible") {
    ImageDiv.style.visibility="hidden"; // or "inline", "flex", etc. depending on your layout
   } else {
    ImageDiv.style.visibility="visible";
    ;
  }
});
