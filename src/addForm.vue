<template>
<f7-page>
  <f7-link @click="close-popup" class="floating-button color-blue">
    <i class="fa fa-arrow-left" aria-hidden="true"></i>
  </f7-link>

  <f7-list form>
    <f7-list-item>
      <f7-label>Set Time</f7-label>
      <f7-input type="datetime-local"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>Comments</f7-label>
      <f7-input type="textarea" placeholder="Textarea"></f7-input>
    </f7-list-item>
                 <f7-list-item>
                     <div class="list-block accordion-list">

                         <li class="accordion-item">
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
                                             <label class="label-checkbox item-content">
                                                 <!-- Checked by default -->
                                                 <input type="checkbox" name="my-checkbox" value="Murder" v-model="Category" lazy>
                                                 <div class="item-media">
                                                     <i class="icon icon-form-checkbox"></i>
                                                 </div>
                                                 <div class="item-inner">
                                                     <div class="item-title">Murder</div>
                                                 </div>
                                             </label>
                                         </li>
                                         <!-- Another chekbox item -->
                                         <li>
                                             <label class="label-checkbox item-content">
                                                 <input type="checkbox" name="my-checkbox" value="Theft" v-model="Category" lazy>
                                                 <div class="item-media">
                                                     <i class="icon icon-form-checkbox"></i>
                                                 </div>
                                                 <div class="item-inner">
                                                     <div class="item-title">Theft</div>
                                                 </div>
                                             </label>
                                         </li>

                                     </ul>
                                 </div>
                             </div>

                         </li>

                     </div>
                 </f7-list-item>
             <p>{{Category}}</p>
  </f7-list>
  <div>
    <f7-button fill color="blue" @click="submit">Send</f7-button>
  </div>


  <div id="camera">
  <f7-button @click='campturePhoto()'>Take a Picture</f7-button>
  <f7-button @click="getPhoto()">PHOTOLIBRARY</f7-button>
  <img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
  <img style="display:none;" id="largeImage" src="" />
  </div>



</f7-page>
</template>
<script>
import {capturePhoto,getPhoto} from './camera.js'
export default {
methods: {
  campturePhoto: function(){
    capturePhoto();
  },
  getPhoto: function(){
    getPhoto();
  }

}

}
</script>
