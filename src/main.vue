<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Right Panel -->
		<f7-panel right cover layout="dark">
			<f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
				<f7-navbar title="Menu" sliding></f7-navbar>
				<f7-pages>
					<f7-page>
					<!--SigIn in Panel
						<f7-list>
							<f7-list-item link="/form/" title="Form"></f7-list-item>
						</f7-list>
					-->
						<f7-list>
							<f7-list-item link="/form/" title="Sign in" link-view="#main-view" link-close-panel></f7-list-item>
						</f7-list>
						<f7-list>
							<f7-list-item link="/form2/" title="Add Event" link-view="#main-view" link-close-panel></f7-list-item>
						</f7-list>
						<f7-list>
							<f7-list-item link="/form3/" title="Add Event3" link-view="#main-view" link-close-panel></f7-list-item>
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
				<f7-pages>
					<f7-page>
						<GmapMap
						:center="center"
						:zoom="7"
						style="width: 100%; height:100%"
						@drag="resize()"
						></GmapMap>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>
	</div>
</template>

<script>
export default {
	data () {
		return {
			center: {lat: 10.0, lng: 10.0},
		}
	}

}
</script>
