document.addEventListener("deviceready", cameraAPI, false);
var $$ = Dom7;

function cameraAPI() {
  console.log("whatttttttttttttttttttttt");
  console.log(navigator.camera);
  $$(function() {

    function camSuccess(imageData) {
      console.log(imageData);
      var img = '<img src ="' + imageData + '"style=" display:block; padding: 0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';


      $$('#CameraOutput').html(img);

    }

    function camError(errorMessage) {
      alert('Error: ' + errorMessage);
      console.log("error accessing camera!!");
    }

    $$('#cameraAccess').on('click', function() {
      console.log("touched camara");
      var options = {
        'quality': 50,
        'targetWidth': 1280,
        'targetHeight': 720,
        'popoverOptions': CameraPopoverOptions,
        'saveToPhotoAlbum': true,
        'correctOrientation': true,
        'allowEdit': false,

        'destinationType': navigator.camera.DestinationType.FILE_URI,
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
        'Direction': navigator.camera.Direction.BACK,

        /*
        0:BACK //use the back-facing camara
        */


      }
      navigator.camera.getPicture(camSuccess, camError, options);

    });

    $$('#GalImage').on('click', function() {
      var options = {
        'destinationType': 1,
        //DATA_URL:0, FILE_URI:1, NATIVE_URI:2
        'sourceType': 0,
        //PHOTOLIBRARY: 0,CAMARA:1, SAVEDPHOTOALBUM: 2
        'mediaType': 0,
        //PICTURE:0, VIDEO:1, ALLMEDIA:2
      }
      navigator.camera.getPicture(camSuccess, camError, options);

    });

    $$('#GalImageEdit').on('click', function() {
      var options = {
        'allowEdit': true,
        'saveToPhotoAlbum': true,

        'destinationType': 1,
        //DATA_URL:0, FILE_URI:1, NATIVE_URI:2
        'sourceType': 0,
        //PHOTOLIBRARY:0,CAMARA:1, SAVEDPHOTOALBUM:2
        'mediaType': 0,
        //PICTURE:0, VIDEO:1, ALLMEDIA:2
      }
      navigator.camera.getPicture(camSuccess, camError, options);

    });

  });
}
//export {cameraAPI};
