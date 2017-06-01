<template>
<f7-page>
<f7-button @click='campturePhoto()'>Testing</f7-button>


</f7-page>
</template>
<script>
export default {

methods: {
  campturePhoto: function(){
    var pictureSource;
    var destinationType;
    function onDeviceReady() {
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }
    document.addEventListener("deviceready",onDeviceReady,false);

    function onPhotoDataSuccess(imageData) {
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
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    var options = {
           'quality': 50,
           'targetWidth': 1280,
           'targetHeight': 720,
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
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
      destinationType: destinationType.DATA_URL });
  }
}

}
</script>