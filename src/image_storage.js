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

var fileSystem;
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



function retrieveImage(Hash){

}

//stores the base64 image into storage
function storeImage(imageData,a,b){
  var max = 4;
  var storageRef = firebase.storage().ref(getHash(a,b)+"/");
  // Create a root reference
  var storeChild = storageRef.child("0.image");

  var store = storeCheck(0,max,storeChild);

  storageRef.child(store+".image").putString(imageData);

  function storeCheck(min,max,storageRef){
    if(min == max){
      return 0
    }
    storageRef.once('value',function(snapshot){
      if(snapshot.hasChild(min+".image")){
            storeCheck(min+1,max,storageRef);
      }
      else{
        return min;
      }
    });
    
   
  }
  
  // storageRef.child().putString(imageData);
  
}

//converts image into base64 and stores it
function imagePrepare(imageURI,a,b){
  // var storageRef = firebase.storage().ref("images");
  getFileAsBase64(imageURI,function(base64Img){
    // storageRef.child(getHash(a,b)).putString(base64Img);
    storeImage(base64Img);
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



export {storeImage, retrieveImage, imagePrepare};
