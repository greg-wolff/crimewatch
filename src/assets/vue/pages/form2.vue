<template>
	<f7-page>
		<div id="BackButton">
		<f7-navbar back-link="Back" sliding></f7-navbar>
		</div>
		<f7-block-title>New Event </f7-block-title>
		<f7-list form>
			<f7-list-item>
				<f7-label>Date time</f7-label>
				<f7-input type="datetime-local"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-label>Description</f7-label>
				<f7-input type="textarea" placeholder="Textarea"></f7-input>
			</f7-list-item>
		</f7-list>
		<div id="camera">
			<!-- TestingCameraAPI -->
			<a id='cameraCheck'>camera</a>

			<a href="#" id="GalImage">GetImage</a>
			<!-- ImageWillDisplayHereForNow -->
			<div id="CameraOutput">-----------Pic--------------</div>
		</div>
	</f7-page>
</template>

<!-- Path to your app js-->
<script>
export default {}
</script>
<script>
var $$ = Dom7;
$$('.cameraCheck').on('click', function (e) {
	console.log('okkk');
});
</script>
<script type="text/javascript">
	function testload() {
		console.log("asdfasdf");
	};
</script>
