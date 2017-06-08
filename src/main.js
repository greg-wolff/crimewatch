import Vue from 'vue'
// Import Vue

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

import * as VueGoogleMaps from 'vue2-google-maps'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
/* OR for Material Theme:
 import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
 import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
 */

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'

//Import backend.js
//import StoreMarker(),Nearby() from './backend.js'
import {
  Nearby,
  loadInfo,
  returnInfo
} from './backend.js'

import {
 storeImage,
 retrieveImage,
 imagePrepare,
 saveB64asImageInitialize
} from './image_storage.js'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAahrq97Y4diRkkbXM6_7uxSVs-7S59AtQ'
  }
});
//Testing
loadInfo(10, 10, {
  "timestamp": "3:14",
  "comment": "foo",
  "photo-url": "ex.url",
  "category": "murder"
});
loadInfo(10.02, 10, {
  "timestamp": "3:14",
  "comment": "bar",
  "photo-url": "ex.url",
  "category": "theft"
});
loadInfo(10.03, 10, {
  "timestamp": "3:14",
  "comment": "baz",
  "photo-url": "ex.url",
  "category": "blah"
});
Nearby(10, 10, 100);
//console.log(Nearby(10,10,100));
// Init App
var vm = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    material: true,
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  },
});
console.log(vm.center);
console.log(vm.markers);
