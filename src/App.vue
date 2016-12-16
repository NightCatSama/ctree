<template>
	<div>
		{{ msg }}.
	</div>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			msg: 'NightCatsssr'
		}
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './stylesheets/common/reset';
@import './stylesheets/common/util';

body {
	background-color: $bg-color;
	height: 100vh;
	@include flex-center;
}
</style>
