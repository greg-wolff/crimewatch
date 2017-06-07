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


var config = {
  apiKey: "AIzaSyCwARzDLBornfgDnyPSJ-wxPSv9Ow2k2Gc",
  authDomain: "crimewatch-8f003.firebaseapp.com",
  databaseURL: "https://crimewatch-8f003.firebaseio.com",
  projectId: "crimewatch-8f003",
  storageBucket: "crimewatch-8f003.appspot.com",
  messagingSenderId: "901121598403"
};


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


//retrieve the image
function retrieveImage(hash,imageName){

}

//stores the base64 image into storage
function storeImage(imageData,a,b){
  var max = 4;
  var storageRef = firebase.storage().ref(getHash(a,b)+"/");
  // Create a root reference

  // var store = storeCheck(0,max,storageRef);
  var imageName = Date.now() + ".image";

  storageRef.child(imageName).putString(imageData);

  // function storeCheck(min,max,storageRef){
  //   if(min == max){
  //     return 0
  //   }
  //   var storeChild = storageRef.child(min+".image");

  //   storeChild.on("value",function(snapshot){
  //     var newPost = snapshot.val();
  //     if(newPost !== null){
  //         min = storeCheck(min+1,max,storageRef);
  //     }
  //     else{
  //       //continue
  //     }
  //   });

  //   return min
    
   
  // }
  
  // storageRef.child().putString(imageData);
  return imageName;
  
}

//converts image into base64 and stores it
function imagePrepare(imageURI,a,b){
  // var storageRef = firebase.storage().ref("images");
  getFileAsBase64(imageURI,function(base64Img){
    // storageRef.child(getHash(a,b)).putString(base64Img);
    storeImage(base64Img,a,b);
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
