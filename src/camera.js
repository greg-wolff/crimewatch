import {
  storeImage, retrieveImage, imagePrepare
} from './image_storage.js'
var longitude = -1;
var latitude = -1;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var options;
window.img;
   // Wait for Cordova to connect with the device
   //
   document.addEventListener("deviceready",onDeviceReady,false);

   // Cordova is ready to be used!
   //
   function onDeviceReady() {
      options = {
            'quality': 50,
            'popoverOptions': CameraPopoverOptions,
            'saveToPhotoAlbum': true,
            'correctOrientation':true,
            'allowEdit': false,

             'destinationType': navigator.camera.DestinationType.DATA_URL,
             /*
             0: DATA_URL image as based64-encoded
             */
             'sourceType': navigator.camera.PictureSourceType.CAMERA,
             /*
             0: PHOTOLIBRARY
             1:CAMARA
             2:SAVEDPHOTOALBUM
             */
             'encodingType': navigator.camera.EncodingType.JPEG,
             /*
             0:JPEG
             1: PNG
             */
             'Direction':navigator.camera.Direction.BACK,
             /*
             0:BACK //use the back-facing camara
             */


      }
       pictureSource=navigator.camera.PictureSourceType;
       destinationType=navigator.camera.DestinationType;
   }

   // Called when a photo is successfully retrieved
   //
   function onPhotoDataSuccess(imageData,lng) {
     // Uncomment to view the base64 encoded image data
     // console.log(imageData);

     // Get image handle
     //
     var smallImage = document.getElementById('smallImage');

     // Unhide image elements
     //
     smallImage.style.display = 'block';

     // Show the captured photo
     // The inline CSS rules are used to resize the image
     //
    smallImage.src = imageData;
    console.log(lng);
    return smallImage.src;
   }

   // Called when a photo is successfully retrieved
   //
   /*function onPhotoURISuccess(imageURI) {
     // Uncomment to view the image file URI
     //console.log(imageURI);

     // Get image handle
     //
     var largeImage = document.getElementById('largeImage');

     // Unhide image elements
     //
     largeImage.style.display = 'block';

     // Show the captured photo
     // The inline CSS rules are used to resize the image
     //
     largeImage.src = imageURI;

     //storeImage(imageURI,)
     return imageURI;
   }*/

   // A button will call this function
   //
   function capturePhoto() {
     // Take picture using device camera and retrieve image as base64-encoded string
     navigator.camera.getPicture(function(imageData){
       var smallImage = document.getElementById('smallImage');

       // Unhide image elements
       //
       smallImage.style.display = 'block';

       // Show the captured photo
       // The inline CSS rules are used to resize the image
       //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      var photo = smallImage.src;
    }, onFail, options);
   }


   // A button will call this function
   //
   function getPhoto() {
     // Retrieve image file location from specified source
     navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
       destinationType: destinationType.FILE_URI,
       sourceType: pictureSource.PHOTOLIBRARY });
   }

   // Called if something bad happens.
   //
   function onFail(message) {
     alert('Failed because: ' + message);
   }

   export {capturePhoto, getPhoto}
