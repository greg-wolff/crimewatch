<template>
<f7-page>
<f7-button @click='Testing()'>Testing</f7-button>
</f7-page>
</template>
<script>
import {Camera} from './camera.js'
</script>
<script>
export default {
  methods:{
		Testing: function() {
			console.log("ok");
			console.log(Camera());
			}
	}
}
</script>
