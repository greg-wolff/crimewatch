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


function retrieveImage(){

}

//stores the base64 image into storage
function storeImage(imageData){
  // Create a root reference
  storageRef.child("TEST").putString(imageData);
  
}

//converts image into base64 and stores it
function imagePrepare(imageURI){
  var storageRef = firebase.storage().ref("images");
  getFileAsBase64(imageURI,function(base64Img){
    storageRef.child(getHash(a,b)).putString(base64Img);
    console.log("WOW! " + base64Img)
  });
  // var childRef = storageRef.child(getHash(a,b)).putString();


  function getFileAsBase64(path, callback){
      window.resolveLocalFileSystemURL(path,gotFile,fail);
    

    function fail(e){
      alert("bad path, can't find file")
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


}



export {storeImage, retrieveImage};
