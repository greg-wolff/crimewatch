import * as firebase from 'firebase';
import * as GeoFire from 'geofire';
// Initialize Firebase
var config ={
  apiKey: "AIzaSyCwARzDLBornfgDnyPSJ-wxPSv9Ow2k2Gc",
  authDomain: "crimewatch-8f003.firebaseapp.com",
  databaseURL: "https://crimewatch-8f003.firebaseio.com",
  projectId: "crimewatch-8f003",
  storageBucket: "crimewatch-8f003.appspot.com",
  messagingSenderId: "901121598403"
};
firebase.initializeApp(config);
//a = long, b = lat
//stores location a,b
function StoreMarker(a,b) {
  var name = a.toString().replace(/\./g,' ')+" and "+ b.toString().replace(/\./g,' ');
  var firebaseRef = firebase.database().ref("locations"); //top level <locations>
  var geoFire = new GeoFire(firebaseRef);
  geoFire.set(name, [a, b]).then(function() { //geofire is for hash
    console.log("Provided key has been added to GeoFire");
  }, function(error) {
    console.log("Error: " + error);
  });
  }

//returns hash when given long and lat
function getHash(a,b)
{
    var hash = "noHash";
    var id = -1;
    var name = a.toString().replace(/\./g,' ')+" and "+ b.toString().replace(/\./g,' ')
    var firebaseRef = firebase.database().ref("locations/" + name);

        // var childRef = firebase.database().ref(firebaseRef.child(name));
        firebaseRef.on("value", function(snapshot) {
            var newPost = snapshot.val();
            if(newPost !== null) //does this data exist?
            {
                // console.log("hash: " + newPost.g);
                hash = newPost.g;
                id = newPost.l[0];
                // console.log("Previous Post ID: " + prevChildKey);
            }else{
                // console.log("null!");
            }
        });
        //console.log('lon: ' + id);
        //console.log('hash: ' + hash);
        return String(hash);
}

//Stores the marker AND creates new info dump in info
function loadInfo(a,b,infoJSON)
{
    StoreMarker(a,b);
    var hash = getHash(a,b);
    var firebaseRef = firebase.database().ref("info"); //top level <info>
    var infoRef = firebaseRef.child(hash);
    infoRef.set(infoJSON);
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
//console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    var pos = {lat: location[0],lng:location[1]};
    var hash = getHash(location[0],location[1]);
    markers.push({position:pos,info:returnInfo(hash)});
    //markers.push(location.concat(getHash(location[0],location[1])));
  });

  return markers;
}

function returnInfo(hash){
  var comment = "first click always return null?";
  var firebaseRef = firebase.database().ref("info/"+ hash );
  firebaseRef.on("value", function(snapshot) {
      comment = snapshot.val();
  });
  return comment;
}



export {StoreMarker,Nearby,loadInfo,returnInfo,getHash, firebase};
