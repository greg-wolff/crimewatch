
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwARzDLBornfgDnyPSJ-wxPSv9Ow2k2Gc",
    authDomain: "crimewatch-8f003.firebaseapp.com",
    databaseURL: "https://crimewatch-8f003.firebaseio.com",
    projectId: "crimewatch-8f003",
    storageBucket: "crimewatch-8f003.appspot.com",
    messagingSenderId: "901121598403"
  };
  firebase.initializeApp(config);
function StoreMarker() {
    var usersRef = firebase.database().ref();
    var i = 5;
    console.log(i);
  }
