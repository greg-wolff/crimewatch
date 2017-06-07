

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
                        <p>Right panel content goes here</p>
                    </f7-block>
                    <f7-block-title>Load page in panel</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/form/" title="Form"></f7-list-item>
                    </f7-list>
                    <f7-block-title>Load page in main view</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
                    </f7-list>
                    <f7-list>
                        <f7-list-item link="/map/" title="Map" link-view="#main-view" link-close-panel></f7-list-item>
                    </f7-list>
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
                  <f7-button active @click='onLogOut()'>LogOut</f7-button>
                    <f7-link icon="icon-bars" open-panel="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>
            <!-- login -->
            <f7-login-screen>
                <f7-view>
                    <f7-pages>
                        <f7-page>
                            <f7-login-screen-title>Crimewatch</f7-login-screen-title>
                                <div class="container">
                                  <input id="txtEmail" type="email" placeholder="Email">
                                  <input id="txtPassword" type="password" placeholder="Password">
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
                    <GmapMap :center="center" :zoom="7" style="width: 100%; height:100%">
                        <GmapMarker v-for="m in markers" :position="m.position" :info="m.info" :clickable="true" @click="getInfo(m)" v-el:current>
                        </GmapMarker>
                    </GmapMap>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-views>
</div>

</template>

<script>

import VueRouter from 'vue-router'
import {
    Nearby, loadInfo, returnInfo, getHash, SignIn
}
from './backend.js'
import {
    config
}
from './firebaseConfig';
export default {
    data() {
            return {
                center: {
                    lat: 10.0,
                    lng: 10.0
                },
                markers: []
            }
        },
        created() {
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
            //firebase.initializeApp(config);
        },
        mounted: function() {
            this.interval = setInterval(this.setCenter(), 1000);
            this.interval = setInterval(this.setMarkers(), 5000);
            //this.setCenter();
            console.log("Manual Call:"+Nearby(36.99558,-120,10000));
            console.log("In mounted");
            console.log(this.$data);
        },
        methods: {
            getInfo: function(m) {
                console.log(m.position.lat);
                var Infohash = getHash(m.position.lat, m.position.lng);
                console.log(returnInfo(Infohash));
            },
            setCenter: function() {
                console.log('setcenter')
                    // Request Location Services
                var watchID = navigator.geolocation.getCurrentPosition(onSuccess,
                    onError, {
                        timeout: 30000,
                        //enableHighAccuracy: true
                    })
                var that = this
                console.log(this)

                function onSuccess(pos) {
                    console.log(pos)
                    console.log(this)
                    that.$data.center = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    that.$data.zoom = 15
                    that.$nextTick(function() {
                        that.setMarkers();
                    });
                }

                function onError(err) {
                    console.log(err)
                    console.log(err.code)
                    console.log(err.message)
                }
            },
            setMarkers: function() {
                var locs = [];
                var locations = Nearby(this.$data.center.lat, this.$data.center.lng, 100);
                /*locations.forEach(function pop(index){
                  var pos = {lat: index[0],lng:index[1]};
                  //info is set just to open up a connection
                  locs.push({position:pos},{info:returnInfo(index[2])});
                  });*/
                this.$data.markers = locations;
                console.log("In set markers");
                console.log(locations);
                console.log(this.$data.markers);
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
        }
}

</script>
