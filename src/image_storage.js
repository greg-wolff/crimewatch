import * as firebase from 'firebase';
import * as GeoFire from 'geofire';
import {
StoreMarker,
Nearby,
loadInfo,
returnInfo,
getHash,
firebase
} from './backend.js'


// var config = {
//   apiKey: "AIzaSyCwARzDLBornfgDnyPSJ-wxPSv9Ow2k2Gc",
//   authDomain: "crimewatch-8f003.firebaseapp.com",
//   databaseURL: "https://crimewatch-8f003.firebaseio.com",
//   projectId: "crimewatch-8f003",
//   storageBucket: "crimewatch-8f003.appspot.com",
//   messagingSenderId: "901121598403"
// };


// var fileSystem;
// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCwARzDLBornfgDnyPSJ-wxPSv9Ow2k2Gc",
//   authDomain: "crimewatch-8f003.firebaseapp.com",
//   databaseURL: "https://crimewatch-8f003.firebaseio.com",
//   projectId: "crimewatch-8f003",
//   storageBucket: "crimewatch-8f003.appspot.com",
//   messagingSenderId: "901121598403"
// };
// firebase.initializeApp(config);

// Wait for Cordova to connect with the device
   //


//retrieve the image data
function retrieveImage(imageName,a,b){

  // var storage = firebase.storage()
  var imageBase64;

  var location = getHash(a,b)+"/"+imageName;

  var downloadRef = firebase.storage().ref(location)

  imageBase64 = downloadRef.getDownloadURL().then(function(url){
    // Get the download URL
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  }).catch(function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
      switch (error.code) {
        case 'storage/object_not_found':
          console.log("file does not exist"+error);
          // File doesn't exist
          break;

        case 'storage/unauthorized':
          console.log("no permission for this file");
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          console.log("cancled");
          // User canceled the upload
          break;

        case 'storage/unknown':
          console.log("unknown error");
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  console.log(imageBase64 + "wowowowow");




}

//stores the base64 image into storage
function storeImage(imageData,a,b){
  var max = 4;
  var storageRef = firebase.storage().ref(getHash(a,b)+"/");
  // Create a root reference

  var imageName = Date.now() + ".image";

  storageRef.child(imageName).putString(imageData);

  return imageName;  
}

//converts image into base64 and stores it
function imagePrepare(imageURI,a,b){
  var imageName;
  // var storageRef = firebase.storage().ref("images");
  getFileAsBase64(imageURI,function(base64Img){
    // storageRef.child(getHash(a,b)).putString(base64Img);
    imageName = storeImage(base64Img,a,b);
    console.log("WOW! " + base64Img)
  });
  // var childRef = storageRef.child(getHash(a,b)).putString();


  function getFileAsBase64(path, callback){

    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
       
       window.resolveLocalFileSystemURL(path,gotFile,fail);
    
    }
      

    function fail(e){
      alert("bad path, can't find file" + e)
    }

    function gotFile(fileEntry){
      fileEntry.file(function(file){
        var reader = new FileReader();
        reader.onloadend = function(e){
          var content = this.result;
          callback(content);
        };

        reader.readAsDataURL(file);
      });

    }

  }

  return imageName;
}



export {storeImage, retrieveImage, imagePrepare};
