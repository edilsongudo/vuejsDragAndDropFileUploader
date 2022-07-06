<script>
	export default {
		props: {
		  percentage: {
		    default: 0,
		    type: Number
		  },
		  filename: {
		    default: '',
		    type: String
		  }
		}
	}
</script>

<template>
	<div class="container">
	    <div class="progress-container">
	    	<h3>Uploading file...</h3>
	    	<p>{{ filename }}</p>
	        <div class="progress not-visible">
	            <div class="progress-done" :style="{width: percentage + '%'}" :data-done="percentage">
	                {{ percentage }}%
	            </div>
	        </div>
	    </div>
	</div>
</template>

<style scoped>
	@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

	:root {
	  --buttonbg1: rgba(255, 128, 128, 1);
	  --buttonbg2: rgba(255, 128, 128, 1);
	}

	* {
		box-sizing: border-box;
	}

	.progress-container {
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		height: 100vh;
	}

	.progress {
		background-color: #d8d8d8;
		border-radius: 20px;
		position: relative;
		margin: 15px 0;
		height: 30px;
		width: 300px;
	}

	.progress-done {
		background: linear-gradient(to left, rgba(255, 128, 128, 1), rgba(255, 128, 128, 1));
		box-shadow: 0 3px 3px -5px rgba(255, 128, 128, 1), 0 2px 5px rgba(255, 128, 128, 1);
		border-radius: 20px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 0;
		/*transition: 1s ease 0.3s;
*/	}
</style>
