
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

//stores location a,b
function StoreMarker(a,b) {
  var name = a.toString().replace(/\./g,' ')+" and "+ b.toString().replace(/\./g,' ')
  var firebaseRef = firebase.database().ref("locations");
  var geoFire = new GeoFire(firebaseRef);
  geoFire.set(name, [a, b]).then(function() {
    console.log("Provided key has been added to GeoFire");
  }, function(error) {
    console.log("Error: " + error);
  });
  }

  //returns a list of locations with dist km of a,b
  function Nearby(a,b,dist){
    var firebaseRef = firebase.database().ref("locations");
    var markers = [];
    var geoFire = new GeoFire(firebaseRef);
    var geoQuery = geoFire.query({
      center: [a,b],
      radius: dist
    });
    geoQuery.on("key_entered", function(key, location, distance) {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)");
      markers.push(location);
    });
    return markers;
  }
