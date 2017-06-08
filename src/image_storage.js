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

function getFileNames(a,b){

  var firebaseRef = firebase.database().ref("info/"+getHash(a,b));
  // var filenames = firebaseRef.child("filenames");
  var files;

  // var childRef = firebase.database().ref(firebaseRef.child(name));
  firebaseRef.on("value", function(snapshot) {
      var newPost = snapshot.val();
      if(newPost !== null) //does this data exist?
      {
          // console.log("hash: " + newPost.g);
          files = newPost.filenames;
          // console.log("Previous Post ID: " + prevChildKey);
      }else{
          // console.log("null!");
      }
  });
  return files;
}


//retrieve the image data
function retrieveImage(imageName,a,b){
  var imageName = imageName || ''

  // var storage = firebase.storage()
  // var imageBase64;
  console.log(b);
  var name = a.toString().replace(/\./g,'x')+"and"+ b.toString().replace(/\./g,'y');



  if(imageName == ''){
    imageName = getFileNames(a,b);
    var location = name+"/"+imageName[0];
    console.log(location);
    var downloadRef = firebase.storage().ref().child(location);

    var path = downloadRef.getPath();
    downloadRef.getDownloadURL().then(function(url){

      // console.log(url.toString());
      document.querySelector("div.photo img").src = url;
      // return url;
      // callback(url);
      // var img = document.querySelector('img');
      // img.src = url;
      // x = url;
    });
  }

  var location = name+"/"+imageName;
  console.log(location);
  var downloadRef = firebase.storage().ref().child(location);
  downloadRef.getDownloadURL().then(function(url){

      // console.log(url.toString());
      var Image =document.querySelector("div.photo img")
      Image.src = url;
      Image.style.display = 'inline';
      // return url;
      // callback(url);
      // var img = document.querySelector('img');
      // img.src = url;
      // x = url;
    });

  // firebase.auth().signInAnonymously().then(function(){

  // }).catch(function(err){
  //   console.error(err);
  // });

  // downloadRef.getDownloadURL().then(function(url){
  //   // Get the download URL
  //   // This can be downloaded directly:
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = function(event) {
  //     var data = xhr.responseText;
  //     var jsonResponse = JSON.parse(data);
  //     console.log(jsonResponse["Data"]);

  //   };
  //   xhr.open('GET', url);
  //   xhr.send();
  // }).catch(function(error) {

  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //     console.log(error);
  //     switch (error.code) {
  //       case 'storage/object_not_found':
  //         console.log("file does not exist"+error);
  //         // File doesn't exist
  //         break;

  //       case 'storage/unauthorized':
  //         console.log("no permission for this file");
  //         // User doesn't have permission to access the object
  //         break;

  //       case 'storage/canceled':
  //         console.log("cancled");
  //         // User canceled the upload
  //         break;

  //       case 'storage/unknown':
  //         console.log("unknown error");
  //         // Unknown error occurred, inspect the server response
  //         break;
  //     }
  //   });
  // console.log(x);
  // return x;
}

//function for converting base64 to blob according to data / content type
//for foreseeable future, contentType will be image/jpeg / image/jpg
//sliceSize = amount of bytes to process
function base64toBlob(base64data,contentType,sliceSize){
  contentType = contentType || '';
  // sliceSize = sliceSize || 512;

  var byteCharacters=atob(base64data);
  var byteArrays=[];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays,{type: contentType});
  return blob;
}

//dad function of 'base64toBlob'
//creates imagefile according to it's database64 content
function saveBase64AsImageFile(path,filename,content,contentType){
  var DataBlob = base64toBlob(content,contentType,512);

  console.log(DataBlob + " beginning file-write....");

  document.addEventListener("deviceready",onDeviceReady,false);
  // Cordova is ready to be used!
  function onDeviceReady() {
    console.log("device is ready: "+path);
    window.resolveLocalFileSystemURL(path,function(dir){
      console.log("access granted...");
      dir.getFile(filename,{create:true},function(file){
        console.log("file created...");
        file.createWriter(function(fileWriter){
          console.log("writing to file...");
          fileWriter.write(DataBlob);
        },function(){
            alert("unable to save file in path: "+folderpath);
          });
      });
    },function(e){
      alert("error occured: "+ e);
    });
  }
}

function saveB64asImageInitialize(base64data){
  //what format is it?
  if(base64data.split(";") != ""){
    var block = base64data.split(";");//bunch of things
    console.log(block);
    var dataType = block[0].split(":")[1];//image/content
    console.log(dataType);
    var realData = block[1].split(",")[1];//data
    console.log(realData);

    document.addEventListener("deviceready",onDeviceReady,false);
    // Cordova is ready to be used!
    function onDeviceReady() {
      var path =cordova.file.externalRootDirectory;
      // var path = "file:///home/cojaroge/images/"
      var filename = Date.now()+".jpg";
      saveBase64AsImageFile(path,filename,realData,dataType);

      return filename;
    }
  }else{
    var contentType = "image/jpg";

    document.addEventListener("deviceready",onDeviceReady,false);
    // Cordova is ready to be used!
    function onDeviceReady() {
      // var path = "file:///home/cojaroge/images/";
      var path = cordova.file.externalRootDirectory;

      var filename = Date.now()+".jpg";
      saveBase64AsImageFile(path,filename,base64data,contentType);

      return filename;
    }
  }
}


//stores the base64 image into storage
function storeImage(imageData,a,b){
  var max = 4;
  var name = a.toString().replace(/\./g,'x')+"and"+ b.toString().replace(/\./g,'y');
  console.log("in store image:"+imageData)
  var storageRef = firebase.storage().ref(name+"/");
  // Create a root reference

  var imageName = Date.now()+".image";
  var uploadTask = storageRef.child(imageName).putString(imageData, 'data_url');
  uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // code snippet from firebase documentation adapted
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  console.log("sucess!")
  var hash = getHash(a,b);
  var firebaseRef = firebase.database().ref("info"); //top level <info>
  var infoRef = firebaseRef.child(hash);
  var src = infoRef.child("url");
  src.set(uploadTask.snapshot.downloadURL);

});
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



export {storeImage, retrieveImage, imagePrepare, saveB64asImageInitialize};
