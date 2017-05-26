<template>
	<f7-page>
		<div id="BackButton">
		<f7-navbar back-link="Back" sliding></f7-navbar>
		</div>
		<f7-block-title>Sign in </f7-block-title>
		<f7-list form>
			<f7-list-item>
				<f7-input type="email" placeholder="E-mail"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-input type="password" placeholder="Password"></f7-input>
			</f7-list-item>
			<f7-block inner>
				<p>
					<f7-grid>
						<f7-col><f7-button big fill color="green">Sing in</f7-button></f7-col>
						<f7-col><f7-button big fill color="red">Sign out</f7-button></f7-col>
					</f7-grid>
				</p>
			</f7-block>
		</f7-list>
	</f7-page>
</template>

<script>
	export default {}
</script>
