<template>
<f7-page>
<f7-button @click='campturePhoto()'>Testing</f7-button>
<f7-button @click="getPhoto()">From Photo Library</f7-button>
<img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
 <img id="largeImage" src="" />
</f7-page>
</template>
<script>
export default {

methods: {
  campturePhoto: function(){
    var pictureSource;
    var destinationType;
    var options = {
           'quality': 50,
           'popoverOptions': CameraPopoverOptions,
           'saveToPhotoAlbum': true,
           'correctOrientation':true,
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
            'Direction':navigator.camera.Direction.BACK,
            /*
            0:BACK //use the back-facing camara
            */


     }

    function onDeviceReady() {
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }
    document.addEventListener("deviceready",onDeviceReady,false);

    function onPhotoDataSuccess(imageData) {
      var smallImage = document.getElementById('smallImage');
      // Unhide image elements
      smallImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      smallImage.src = imageData;
    }
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, options);
  },


  getPhoto: function () {
    var pictureSource;
    var destinationType;
    function onDeviceReady() {
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }
    document.addEventListener("deviceready",onDeviceReady,false);

    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      // Get image handle
    var largeImage = document.getElementById('largeImage');
     // Unhide image elements

    largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
    largeImage.src = imageURI;
    }
    function onFail(message) {
      alert('Failed because: ' + message);
    }


    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: pictureSource.SAVEDPHOTOALBUM });

  }
}

}
</script>
