

<template>

<!-- App -->
<div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
        <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar title="Right Panel" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-block>
                        <p><f7-button active @click='onLogOut()'>LogOut</f7-button></p>
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
                    <f7-button v-if="!this.$data.track" active @click='snap()'>Center</f7-button>
                    <f7-link icon="icon-bars" open-panel="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>
            <f7-login-screen>
                <f7-view>
                    <f7-pages>
                        <f7-page>
                            <f7-login-screen-title>Crimewatch</f7-login-screen-title>
                                <div class="container">
                                  <center><input id="txtEmail" type="email" placeholder="Email">
                                  <input id="txtPassword" type="password" placeholder="Password"></center>
                                  <f7-button active @click='onLogIn()'>Sign in</f7-button>
                                </div>

                                <center>OR</center>
                                <center>
                                <div class="page-content">
                                  <div class="content-block">
                                    <!-- In data-popup attribute we specify CSS selector of popup we need to open -->
                                    <p><a href="#" data-popup=".popup-createaccount" class="open-popup">Create an Account </a></p>
                                  </div>
                                </div>
                              </center>
                              ...
                              <!-- About Popup -->
                              <div class="popup popup-createaccount">
                                <div class="content-block">
                                  <div class="list-block">
                                    <ul>
                                      <!-- Text inputs -->
                                      <li>
                                        <div class="item-content">
                                          <div class="item-media"><i class="icon f7-icons">Name</i></div>
                                          <div class="item-inner">
                                            <div class="item-input">
                                              <input type="text" placeholder="Your name">
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="item-content">
                                          <div class="item-media"><i class="icon f7-icons">email</i></div>
                                          <div class="item-inner">
                                            <div class="item-input">
                                              <input id="txtEmail2" type="email" placeholder="E-mail">
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="item-content">
                                          <div class="item-media"><i class="icon f7-icons">Password</i></div>
                                          <div class="item-inner">
                                            <div class="item-input">
                                              <input id="txtPassword2" type="password" placeholder="Password">
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                    <f7-button active class="close-popup" @click='SignUpSummit()'>Sign Up</f7-button>
                                    <f7-button href="#" class="close-popup" active>Cancel</f7-button>
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
                        <a href="#" @click="close"><i class="fa fa-times fa-3x" aria-hidden="true"></i></a>
                        <f7-list form>
                          <div class="accordion-item">
                                <a href="#" class="item-content item-link">
                                    <div class="item-inner">
                                        <div class="item-title">Categories</div>
                                    </div>
                                </a>
                                <div class="accordion-item-content">
                                    <div class="list-block">
                                        <ul>
                                            <!-- Single chekbox item -->
                                            <li>
                                                <!--  -->
                                                <input type="checkbox" id="murder" value="Murder" style="width:25px;height:25px;" v-model.lazy="Category"><font size="4">Murder</font></input>
                                            </li>
                                            <!-- Another chekbox item -->
                                            <li>
                                                <!--  -->
                                                <input type="checkbox" id="theft" value="Theft" style="width:25px;height:25px;" v-model.lazy="Category"><font size="4">Theft</font></input>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <f7-list-item>
                                <f7-label><b>Comments</b></f7-label>
                                <f7-input type="textarea" placeholder="" v-model="comment" lazy />
                            </f7-list-item>


                            <p>{{Category}}</p>
                        </f7-list>

                        <f7-button fill color="blue" @click="submit">Send</f7-button>
                        <f7-button @click='campturePhoto()'>Take a Picture</f7-button>
                        <f7-button @click="getPhoto()">PHOTOLIBRARY</f7-button>
                        <img style="display:none;width:60px;height:60px;" id="smallImage" src="null" />
                        <img style="display:none;" id="largeImage" src="" />
                        <!-- Popup content goes here -->
                    </div>
                    <div class="popup popup-marker tablet-fullscreen">
                        <div class="content-block">
                            <p><a href="#" @click="close"><i class="fa fa-arrow-left fa-3x" aria-hidden="true"></i></a></p>
                            <h1> {{viewComment}} </h1>
                            <div class="photo" style="display:block">
                                <img style="display:inline;max-width:100%;height:auto;" id="img" :src="getUrl" alt="no image" class="lazy lazy-fadeIn" />
                            </div>
                            <div class="chip" v-for="type in viewTypes">
                                <div class="chip-label"> {{type}} </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" data-popup=".popup-addcrime" class=" floating-button color-blue" @click="crime()">
                        <i class="icon icon-plus"></i>
                    </a>
                    <GmapMap ref="myMap" :center.sync="center" :zoom="zoom"
                    @zoom_changed="zoomUpdate($event)"
                    @idle="recenter()"
                    @center_changed="cen($event)"
                    :options='{ zoomControl: false, streetViewControl: false, disableDoubleClickZoom: true  }'
                    style="width: 100%; height:100%">
                        <GmapMarker :position="loc" :optimized="false" :zIndex="1" :icon="curr"></GmapMarker>
                        <!--borrowing images for clusters from google for demo purpose-->
                        <Gmap-cluster :gridSize="10" :imagePath="imagePath" @click="viewCluster">
                        <GmapMarker v-for="m in markers" :position="m.position" :info="m.info" :clickable="true" @click="getInfo(m)">
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
    capturePhoto, getPhoto
}
from './camera.js'
import {
    storeImage, retrieveImage, imagePrepare
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
                loc:{
                  lat:10.0,
                  lng:10.0
                },
                markers: [],

                //flags for functions
                track:true,
                pause:false,

                //current location image
                curr: 'http://i.imgur.com/VnDEIQt.png',
                //cluster image
                imagePath: 'https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m',

                //Add crime variables
                comment: null,
                Category: ["Murder", "Theft"],

                //Retrieval info
                viewTypes: [],
                getUrl: null,
                viewComment: null,

            }
        },
        beforeCreated(){
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
            //console.log("In mounted");
            //console.log(this.$data);
        },
        methods: {
            recenter: function(){
              console.log("in recenter");
            },
            viewCluster: function(){
              this.$data.track = false;
            },
            snap: function(){
              this.$data.track = true;
              this.$data.zoom = 15;
              //this.$refs.myMap.panTo(this.$data.loc);
              //this.$refs.myMap.zoom = 15;
              //this.$refs.myMap.panTo(this.$data.loc);
            },
            zoomUpdate: function(event) {
                this.$data.zoom = event;
            },
            cen: function(event){
              if(this.$data.track == false){
                this.$data.center = event;
              }
            },
            campturePhoto: function() {
                capturePhoto();
            },
            getPhoto: function() {
                getPhoto();
            },
            crime: function() {
                  document.getElementById('smallImage').src = "";
                  this.$data.pause = true;
                  console.log("in crime:" + this.$data.pause)
                  this.$f7.popup('.popup-addcrime')

            },
            close: function() {
                this.$data.pause = false;
                this.setMarkers();
                this.$f7.closeModal()
            },
            submit: function() {
                this.$nextTick(function() {
                    var currentTime = new Date();
                    var year = currentTime.getFullYear();
                    var month = currentTime.getMonth();
                    var day = currentTime.getDay();
                    var hour = currentTime.getHours();
                    var minute = currentTime.getMinutes();
                    var types = this.$data.Category;
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
                    if(base64){
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
                if(typeof json.url != "undefined"){
                  //var Image =document.querySelector("div.photo img")
                  //Image.src = json.url;
                  //Image.style.display = 'inline';
                  this.$data.getUrl = json.url;
                }else{
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
                    if(that.$data.track == true){
                      that.$data.center = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                      }
                    }
                    setTimeout(function(){ that.setLoc() },5000);
                    /*that.$nextTick(function() {
                        that.setMarkers();
                    });*/
                }

                function onError(err) {
                    console.log(err)
                    console.log(err.code)
                    console.log(err.message)
                    setTimeout(function(){ that.setLoc() },5000);
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
                    if(this.$data.pause != true){
                      setTimeout(function(){ self.setMarkers() },5000)
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
            promise.catch(e => console.log(e.message));
            return false;
          },
          onLogOut: function () {
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
           promise.catch(e => console.log(e.message));
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
