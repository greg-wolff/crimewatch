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
          <GmapMap :center="center" :zoom="7" style="width: 100%; height:100%">
          <GmapMarker
              v-for="m in markers"
              :position="m.position"
              :info = "m.info"
              :clickable="true"
              @click = "getInfo(m)"
              v-el:current
              >
          </GmapMarker>
          </GmapMap>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-views>
</div>
</template>

<script>
import {Nearby,loadInfo,returnInfo,getHash} from './backend.js'
export default {
  data() {
    Nearby(10,10,100);
    console.log(Nearby(10,10,100));
    return {
      center: {lat: 10.0,lng: 10.0},
      markers: []
    }
  },
  mounted: function(){
    this.setCenter();
    this.interval = setInterval(this.setMarkers(),1000);
    console.log("In mounted");
  },
  methods: {
    getInfo: function(m){
        console.log(m.position.lat);
        var Infohash = getHash(m.position.lat,m.position.lng);
        console.log(returnInfo(Infohash));
    },
    setCenter: function() {
        console.log('setcenter')
        // Request Location Services
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess,
          onError, {
            timeout: 30000
            })
      var that = this
      console.log(this)
      function onSuccess(pos) {
        console.log(pos)
        console.log(this)
        that.$data.center = {
          //lat: pos.coords.latitude,
          //lng: pos.coords.longitude
          lat: 10.0,
          lng: 10.0
        }
        that.$data.zoom = 15
        /* console.log(App.$data.center)
        App.setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }) */
      }
      function onError(err) {
        console.log(err)
        console.log(err.code)
        console.log(erro.message)
      }
    },
    setMarkers: function(){
        var locs = [];
        var locations = Nearby(10,10,100);
        /*locations.forEach(function pop(index){
          var pos = {lat: index[0],lng:index[1]};
          //info is set just to open up a connection
          locs.push({position:pos},{info:returnInfo(index[2])});
          });*/
        this.$data.markers = locations;
        console.log("In set markers");
        console.log(locations);
        console.log(this.$data.markers);
    }
  }
}
</script>
