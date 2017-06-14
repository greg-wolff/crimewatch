

<template>
<!-- App -->
<div id="app">
  <transition name="fade">
    <div id="splash" v-if="this.$data.splash"></div>
  </transition>
  <!-- Statusbar -->
  <f7-statusbar></f7-statusbar>
  <!-- Right Panel -->
  <f7-panel right cover>
    <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
      <f7-navbar title="Settings" sliding></f7-navbar>
      <f7-pages>
        <f7-page>
          <f7-block>
            <p>
              <f7-button active fill color="blue" @click='onLogOut()'>LogOut</f7-button>
            </p>
          </f7-block>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-panel>
  <!-- Main Views -->
  <f7-views>
    <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
      <!-- Navbar -->
      <f7-navbar>
        <f7-nav-center sliding>Crimewatch</f7-nav-center>
        <f7-nav-right>
          <f7-link icon="fa fa-cog" open-panel="right"></f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-login-screen>
        <f7-view>
          <f7-pages>
            <f7-page>
              <div class="view">
                <div class="page">
                  <div class="page-content login-screen-content">
                    <f7-login-screen-title></f7-login-screen-title>
                    <form>
                      <transition name="fade">

                        <div class="list-block" v-if="!this.$data.createAcc">
                          <ul>
                            <li class="item-content">
                              <div class="item-media"><i class="fa fa-envelope-o" aria-hidden="true" id="White"></i></div>
                              <div class="item-inner">
                                <div class="item-input">
                                  <input id="txtEmail" type="email" placeholder="E-mail">
                                </div>
                              </div>
                            </li>
                            <li class="item-content">
                              <div class="item-media"><i id="White" class="fa fa-key" aria-hidden="true"></i></div>
                              <div class="item-inner">
                                <div class="item-input">
                                  <input id="txtPassword" type="password" placeholder="Password">
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </transition>
                      <transition name="fade">
                        <div class="list-block" v-if="!this.$data.createAcc">
                          <ul>
                            <center>
                              <f7-button active fill color="blue" @click='onLogIn()'>Sign in</f7-button>
                            </center>
                          </ul>
                          <center>OR</center>
                          <center>
                            <div class="page-content">
                              <div class="content-block">
                                <!-- In data-popup attribute we specify CSS selector of popup we need to open -->
                                <p><a href="#" data-popup=".popup-createaccount" @click="createAcc = !createAcc" class="open-popup">Create an Account</a></p>
                              </div>
                            </div>
                          </center>
                        </div>
                      </transition>

                    </form>
                  </div>
                </div>
              </div>
              <!-- About Popup -->
              <div id="signUp" class="popup popup-createaccount">
                <div class="content-block">
                  <div class="list-block">
                    <ul>
                      <!-- Text inputs -->
                      <li>
                        <div class="item-content">
                          <div class="item-media"><i id="White" class="fa fa-user" aria-hidden="true"></i></div>
                          <div class="item-inner">
                            <div class="item-input">
                              <input type="text" placeholder="Your name">
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content">
                          <div class="item-media"><i id="White" class="fa fa-envelope-o" aria-hidden="true"></i></div>
                          <div class="item-inner">
                            <div class="item-input">
                              <input id="txtEmail2" type="email" placeholder="E-mail">
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content">
                          <div class="item-media"><i id="White" class="fa fa-key" aria-hidden="true"></i></div>
                          <div class="item-inner">
                            <div class="item-input">
                              <input id="txtPassword2" type="password" placeholder="Create Password">
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <f7-button active fill color="blue" class="close-popup" @click='SignUpSummit()'>Sign Up</f7-button>
                    <f7-button href="#" class="close-popup" active @click="createAcc = !createAcc">Cancel</f7-button>
                  </div>
                </div>
              </div>




            </f7-page>
          </f7-pages>
        </f7-view>
      </f7-login-screen>
      <!-- Pages -->
      <!--
				<f7-pages>
					<f7-page>
						<f7-block-title>Welcome to my App</f7-block-title>
						<f7-block inner>
							<p>Duis sed erat ac eros ultrices pharetra id ut tellus. Praesent rhoncus enim ornare ipsum aliquet ultricies. Pellentesque sodales erat quis elementum sagittis.</p>
						</f7-block>
					</f7-page>
				</f7-pages>
      -->
      <f7-pages>
        <f7-page>
          <div class="popup popup-addcrime tablet-fullscreen">
            <div id="popup-title">
              <h1 class="popup-header">Create New Incident</h1>
              <a href="#"><i aria-hidden="true" class="close fa fa-times fa-3x"></i></a>
            </div>
            <a href="#" @click="close"><i class="close fa fa-times fa-3x" aria-hidden="true"></i></a>
            <f7-list form>
              <div id="insert-photo" @click='campturePhoto()'>
                <div id="photo-circle">
                  <img id="smallImage" src="null" />
                  <i aria-hidden="true" class="fa fa-camera fa-3x" id="camera-icon"></i>
                  <div id="add-circle">
                    <i aria-hidden="true" class="add-photo-icon fa fa-plus fa-3x"></i>
                  </div>
                  <div id="edit-circle">
                    <i aria-hidden="true" class="edit-photo-icon fa fa-pencil fa-3x"></i>
                  </div>
                </div>
              </div>
              <div id="insert-details">
                <h2 id="body-header">Comments</h2>
                <f7-input type="textarea" placeholder="" v-model="comment" lazy />
                <h2 id="body-header">Categories</h2>
                <div class="row">
                  <a href="#" class="chip" v-for="type in Category" :clickable="true" @click="addTag(type,$event)"> {{type}} </a>
                </div>
                <a href="#" class="color-blue button-fill button" @click="submit">CREATE</a>
              </div>

            </f7-list>
            <!-- Popup content goes here -->
          </div>
          <div class="popup popup-marker tablet-fullscreen">
            <div id="popup-title">
              <h1 class="popup-header">{{timeStamp}}</h1>
              <a href="#" @click="close"><i aria-hidden="true" class="close fa fa-times fa-3x"></i></a>
            </div>
            <div id="insert-photo" style="background: rgb(46, 47, 56);">
              <h1 id="quote"> {{viewComment}} </h1>
              <div id="in-quote"></div>
              <div id="out-quote"></div>

            </div>
            <div id="popup-content">
              <h2 id="body-header">Tagged with</h2>
              <!-- <div class="chip"> -->
                <!-- <div class="chip-label"> Police </div> -->
              <!-- </div> -->
              <div class="photo" id="view-photo" style="display:block">
                <img style="display:inline;max-width:100%;height:auto;" id="img" :src="getUrl" alt="no image" class="lazy lazy-fadeIn" />
              </div>
              <div class="chip" v-for="type in viewTypes">
                <div class="chip-label"> {{type}} </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <f7-button v-if="!this.$data.track" active fill color="blue" id="center-button" @click='snap()'>Center</f7-button>
          </transition>
          <a href="#" data-popup=".popup-addcrime" class=" floating-button color-blue" @click="crime()">
                        <i class="icon icon-plus"></i>
                    </a>
          <GmapMap ref="myMap" :center.sync="center" :zoom="zoom" @zoom_changed="zoomUpdate($event)" @center_changed="cen($event)" @idle="recenter" @drag="drag" :options='{ zoomControl: false,   mapTypeControl: false, fullscreenControl: false, streetViewControl: false, disableDoubleClickZoom: true  }'
            style="width: 100%; height:100%">
            <GmapMarker :position="loc" :optimized="false" :zIndex="1" :icon="curr"></GmapMarker>
            <!--borrowing images for clusters from google for demo purpose-->
            <Gmap-cluster :gridSize="10" :icon="imagePath" @click="viewCluster">
              <GmapMarker v-for="m in markers" :position="m.position" :info="m.info" :clickable="true" :icon="customMarker" @click="getInfo(m)">
              </GmapMarker>
            </Gmap-cluster>
          </GmapMap>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-views>
</div>
</template>

<script>
// document.querySelector('img').src = {{photo}};

import {
  Nearby,
  loadInfo,
  returnInfo,
  getHash
}
from './backend.js'
import * as firebase from 'firebase';
import {
  capturePhoto,
  getPhoto
}
from './camera.js'
import {
  storeImage,
  retrieveImage,
  imagePrepare
}
from './image_storage.js'
import {
  config
}
from './firebaseConfig';
export default {
  data() {
    return {
      //map variables
      center: {
        lat: 10.0,
        lng: 10.0
      },
      zoom: 15,
      loc: {
        lat: 10.0,
        lng: 10.0
      },
      markers: [],

      track: true,
      pause: false,
      splash: true,

      //current location image
      curr: 'http://i.imgur.com/VnDEIQt.png',
      //custom marker image
      customMarker: 'http://i.imgur.com/GAvSlmr.png',
      //cluster image
      imagePath: 'https://github.com/greg-wolff/crimewatch/blob/production/src/assets/images/m1.png',

      //Add crime variables
      comment: null,
      createAcc: false,
      Category: ["Murder", "Theft", "Police", "Automotive", "Assault", "Racial", "Sexual", "Harrasment", "Vandalism"],
      timeStamp: null,
      //for specific tag
      categoryType: [],

      //Retrieval info
      viewTypes: [],
      getUrl: null,
      viewComment: null,

    }
  },
  beforeCreated() {
    firebase.initializeApp(config);
  },
  created() {
    //user login
    var self = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        //  console.log("logged in should go to main")
        self.$f7.closeModal();
      } else {

        self.$f7.loginScreen();
      }
    });
    //this.setCenter();

  },
  mounted: function() {
    this.setLoc();
    this.setMarkers();
    console.log(this.$data.pause)
    setTimeout(() => document.getElementById("splash").style.display = 'none', 3000);
    setTimeout(() => this.$data.splash = false, 3000)
    console.log("In mounted");
    //console.log(this.$data);
  },
  methods: {
    recenter: function() {
      console.log("in recenter")
      if (this.$data.track == true) {
        this.$refs.myMap.panTo(this.$data.loc);
      }
    },
    drag: function() {
      console.log("in drag")
      this.$data.track = false;
    },
    viewCluster: function() {
      this.$data.track = false;
    },
    snap: function() {
      this.$data.track = true;
      this.$refs.myMap.panTo(this.$data.loc);
      this.$data.zoom = 15;
      //this.$refs.myMap.panTo(this.$data.loc);
      //this.$refs.myMap.zoom = 15;
      //this.$refs.myMap.panTo(this.$data.loc);
    },
    zoomUpdate: function(event) {
      this.$data.zoom = event;
    },
    cen: function(event) {
      this.$data.center.lat = event.lat();
      this.$data.center.lng = event.lng();
    },
    campturePhoto: function() {
      capturePhoto();
    },
    getPhoto: function() {
      getPhoto();
    },
    crime: function() {
      document.getElementById('smallImage').src = "";
      document.getElementById('add-circle').style.display = 'block';
      document.getElementById('edit-circle').style.display = 'none';

      //this.$data.pause = true;
      console.log("in crime:" + this.$data.pause)
      this.$f7.popup('.popup-addcrime')

    },
    close: function() {
      this.$data.pause = false;
      this.setMarkers();
      this.$f7.closeModal()
    },
    addTag: function(tag, event) {
      console.log(tag);

      if (this.$data.categoryType.includes(tag)) {
        console.log("removing tag");
        //these chips are gainsboro
        event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.06)';
        event.target.style.color = '#3e3e3e';

        // $(this).animate({'opacity':1});

        this.$data.categoryType.splice(this.$data.categoryType.indexOf(tag), 1);
      } else {
        console.log("adding tag");
        this.$data.categoryType.push(tag);
        event.target.style.backgroundColor = 'grey';
        event.target.style.color = 'white';
        // (this).animate({'opacity':0});
      }


    },
    submit: function() {
      this.$nextTick(function() {
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var month = currentTime.getMonth();
        var day = currentTime.getDay();
        var hour = currentTime.getHours();
        var minute = currentTime.getMinutes();
        var types = this.$data.categoryType;
        var comment = this.$data.comment;
        var data = {
          "time": year + "/" + month + "/" + day + " " + hour + ":" + minute,
          "category": types,
          "comment": comment
        }
        var url = document.getElementById('smallImage').src;
        //console.log(url);
        var check = new RegExp("data:image/jpeg;base64,")
        var base64 = check.test(url);
        console.log(url);
        if (base64) {
          console.log(url);
          storeImage(url, this.$data.loc.lat, this.$data.loc.lng);
        }
        //console.log(window.img);
        loadInfo(this.$data.loc.lat, this.$data.loc.lng, data);
      });
      //console.log(this.$data);
      this.$data.pause = false;
      this.setMarkers();
      this.$f7.closeModal();
    },
    getInfo: function(m) {
      console.log(m.position.lat);
      this.$data.pause = true;
      var Infohash = getHash(m.position.lat, m.position.lng);
      var json = returnInfo(Infohash);
      //console.log(this.$f7);
      /*console.log(json)*/
      //push category data to vue.$data so we can use v-for
      this.$data.viewTypes = json.category;
      this.$data.viewComment = json.comment;
      // console.log(json)
      this.$data.timeStamp = json.time;
      if (typeof json.url != "undefined") {
        //var Image =document.querySelector("div.photo img")
        //Image.src = json.url;
        //Image.style.display = 'inline';
        this.$data.getUrl = json.url;
      } else {
        this.$data.getUrl = "";
      }
      // console.log(this.$data.center.lat);
      // console.log("photo: " +this.$data.photo);
      /*var popupHTML =
          '<div class="popup">' +
          '<div class="content-block">' +
          '<p><a href="#" class="close-popup"><i class="fa fa-arrow-left" aria-hidden="true"></i></a></p>' +
          '<h1>' + json.comment + '</h2>' +
          '<div class="chip" v-repeat="5">' +
          '<div class="chip-label" >' + json.category + '</div></div>' +
          '</div>' +
          '</div>'
          */
      this.$f7.popup('.popup-marker');
    },
    setLoc: function() {
      console.log('setLoc')
      // Request Location Services
      var watchID = navigator.geolocation.getCurrentPosition(onSuccess,
        onError, {
          timeout: 30000,
          enableHighAccuracy: true
        })
      var that = this
      //console.log(this)

      function onSuccess(pos) {
        //console.log(pos)
        //console.log(this)
        that.$data.loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        if (that.$data.track == true) {
          that.$refs.myMap.panTo(that.$data.loc);
        }
        //that.$data.center = that.$data.loc;
        setTimeout(function() {
          that.setLoc()
        }, 500);

      }

      function onError(err) {
        console.log("in error")
        console.log(err.code)
        console.log(err.message)
        setTimeout(function() {
          that.setLoc()
        }, 500);
        /*that.$nextTick(function() {
            that.setMarkers();
        });*/
      }
    },
    setMarkers: function() {
      var locs = [];
      //console.log(this.$data.zoom);
      var radius = Math.pow(2, (17 - this.$data.zoom));
      console.log("in setMarkers");
      this.$nextTick(function() {
        //console.log(radius)
        var locations = Nearby(this.$data.center.lat, this.$data.center.lng, radius);
        this.$data.markers = locations;
        //console.log("In set markers");
        var self = this;
        if (this.$data.pause != true) {
          setTimeout(function() {
            self.setMarkers()
          }, 5000)
          console.log(this.$data.pause)
        }
      });
      /*locations.forEach(function pop(index){
        var pos = {lat: index[0],lng:index[1]};
        //info is set just to open up a connection
        locs.push({position:pos},{info:returnInfo(index[2])});
        });*/

    },
    onLogIn: function() {
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      console.log("Log in Buttonclicked");
      //Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign In
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.then(user => console.log(user));
      //promise.catch(e => console.log(e.message));
      promise.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('Incorrect password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
      return false;
    },
    onLogOut: function() {
      firebase.auth().signOut();
      console.log('not logged in');
      //btnLogout.classList.add('hide');
    },
    SignUpSummit: function() {
      const txtEmail = document.getElementById('txtEmail2');
      const txtPassword = document.getElementById('txtPassword2');
      //Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign In
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      //promise.then(user => console.log(user));
      // promise.catch(e => console.log(e.message));
      promise.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
      firebase.auth().signOut();
    }
  },
  watch: {
    '$route' (to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
}
</script>
