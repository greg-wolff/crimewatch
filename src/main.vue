

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
                    <f7-link icon="icon-bars" open-panel="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>
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
                    <div class="popup popup-addcrime">
                        Report a crime
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
                                                <input type="checkbox" id="murder" value="Murder" onclick="checked()" style="width:25px;height:25px;" v-model.lazy="Category"><font size="4">Murder</font></input>
                                            </li>
                                            <!-- Another chekbox item -->
                                            <li>
                                                <!--  -->
                                                <input type="checkbox" id="theft" value="Theft" onclick="checked()" style="width:25px;height:25px;" v-model.lazy="Category"><font size="4">Theft</font></input>
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
                        <img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
                        <img style="display:none;" id="largeImage" src="" />
                        <!-- Popup content goes here -->
                    </div>
                    <div class="popup popup-marker">
                        <div class="content-block">
                            <p><a href="#" @click="close"><i class="fa fa-arrow-left" aria-hidden="true"></i></a></p>
                            <h1> {{viewComment}} </h1>
                            <div class="photo">
                            <img/>
                            </div>
                            <div class="chip" v-for="type in viewTypes">
                                <div class="chip-label"> {{type}} </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" data-popup=".popup-addcrime" class=" floating-button color-blue open-popup">
                        <i class="icon icon-plus"></i>
                    </a>
                    <GmapMap :center="center" :zoom="zoom" @zoom_changed="zoomUpdate($event)" :options='{ zoomControl: false, streetViewControl: false  }' style="width: 100%; height:100%">
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
// document.querySelector('img').src = {{photo}};

import {
    Nearby,
    loadInfo,
    returnInfo,
    getHash
}
from './backend.js'
import {
    capturePhoto, getPhoto
}
from './camera.js'
import {
    storeImage, retrieveImage, imagePrepare
}
from './image_storage.js'
export default {
    data() {
            return {
                center: {
                    lat: 10.0,
                    lng: 10.0
                },
                zoom: 15,
                markers: [],
                comment: null,
                Category: ["Murder", "Theft"],
                viewTypes: [],
                viewComment: null,
                photo: []
            }
        },
        mounted: function() {
            this.setCenter();
            //console.log("In mounted");
            //console.log(this.$data);
        },
        methods: {
            zoomUpdate: function(event) {
                //console.log(event);
                this.$data.zoom = event;
                this.setMarkers();
            },
            campturePhoto: function() {
               //console.log(window.longitude);
               //console.log(window.latitude);
               capturePhoto();
               console.log(window.img);
            },
            getPhoto: function() {
                getPhoto();
            },
            crime: function() {
                this.$data.photo = null;
                this.$f7.popup('.popup-addcrime');
            },
            close: function() {
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
                    console.log("in submit:"+this.$data.photo)
                    storeImage(window.img,this.$data.center.lat, this.$data.center.lng);
                    loadInfo(this.$data.center.lat, this.$data.center.lng, data);
                });
                //console.log(this.$data);
                this.$f7.closeModal()
            },
            getInfo: function(m) {
                console.log(m.position.lat);
                var Infohash = getHash(m.position.lat, m.position.lng);
                var json = returnInfo(Infohash);
                //console.log(this.$f7);
                /*console.log(json)*/
                //push category data to vue.$data so we can use v-for
                this.$data.viewTypes = json.category;
                this.$data.viewComment = json.comment;
                this.$data.photo = retrieveImage($data.center.lng,$data.center.lat);
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
            setCenter: function() {
                //console.log('setcenter')
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
                    that.$data.center = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    that.$nextTick(function() {
                        that.setMarkers();
                    });
                }

                function onError(err) {
                    //console.log(err)
                    //console.log(err.code)
                    //console.log(err.message)
                    that.$nextTick(function() {
                        that.setMarkers();
                    });
                }
            },
            setMarkers: function() {
                var locs = [];
                //console.log(this.$data.zoom);
                var radius = Math.pow(2, (17 - this.$data.zoom));
                this.$nextTick(function() {
                    //console.log(radius)
                    var locations = Nearby(this.$data.center.lat, this.$data.center.lng, radius);
                    this.$data.markers = locations;
                    //console.log("In set markers");
                    this.setCenter()
                });
                /*locations.forEach(function pop(index){
                  var pos = {lat: index[0],lng:index[1]};
                  //info is set just to open up a connection
                  locs.push({position:pos},{info:returnInfo(index[2])});
                  });*/

            }
        }
}

</script>
