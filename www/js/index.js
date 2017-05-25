/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.setupVue();
        this.initMap();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    setupVue: () => {
      var vm = new Vue ({
        el: '#vue-instance',
        data: {
          msg: 'Hello Crimewatch!'
        }
      });
    },
    initMap: () => {
      //a manual test of adding a marker.
      var Test = {
        comment: "ex"
      };
      loadInfo(-25.363,131.044,Test);
      loadInfo(-27.0,133,Test);
      loadInfo(-29.45,132.14,Test);
      loadInfo(-28.0,136,Test);

      //a manual test of loading nearby markers.
      var locations = Nearby(-26.45,132.144,1000);
      console.log(locations);
      // in the second index [0] is lat [1] is longitude
      var uluru = {lat: -26.45, lng: 132.144};
      var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 4,
       center: uluru
      });
      locations.forEach(function pop(index){
        var pos = {lat: index[0], lng:index[1]};
        var marker = new google.maps.Marker({
          map: map,
          position: pos,
          info: [index][2]
        });
        marker.addListener('click', function() {
          console.log(this);
        });
        console.log(index);
      });
    }
};

app.initialize();
