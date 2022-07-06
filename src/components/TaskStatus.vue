<script>
	export default {
		props: {
		  taskID: {
		    default: '',
		    type: String
		  },
		  filename: {
		    default: '',
		    type: String
		  }
		},
        data() {
            return {
            	t: null,
            	taskFinished: false,
            	downloadURL: false,
            };
        },
		methods: {
            pollResults() {
                axios.get(`https://audiototextonline.herokuapp.com/api/v1/results/${this.taskID}/`)
                    .then((res) => {
                    	if (res.data.status === 'SUCCESS') {
                    		clearInterval(this.t)
                    		this.taskFinished = true
                    		this.downloadURL = res.data.transcription_url
                    	}
                    	if (res.data.status === 'FAILURE') {
                    		clearInterval(this.t)
                    		this.taskFinished = true
                    	}
                    }).catch((err) => console.error(err));
            }
		},
		mounted() {
			this.t = setInterval(this.pollResults, 5000)
		}
	}
</script>

<template>
	<div class="container">
		<div class="task-status-container">
			<div v-if="!downloadURL && !taskFinished">
				<p>{{ filename }}</p>
				<p>We are processing your file, please wait...</p>
				<div class="loader">Loading...</div>
			</div>
			<div v-else-if="taskFinished && downloadURL">
				<h3>Your file is ready</h3>
				<a class="download-link" :href="downloadURL">Download File</a>
			</div>
			<div v-else-if="!downloadURL && taskFinished">
				<p>Unfortunately, there was a problem with your transcription :/</p>
			</div>
		</div>
	</div>
</template>

<style scoped>

	.download-link {
	    display: block;
	    border-radius: 6px;
	    padding: 10px 50px;
	    color: white;
	    background: #ff8080;
	    border-width: 1px;
	    border: 2px solid #ff8080;
	    cursor: pointer;
	    transition: .5s;
	    font-size: 1rem;
	    font-weight: bold;
	    text-decoration: none;
	}

	.download-link:hover {
	    color: #ff8080;
	    background: transparent;
	}

	.task-status-container {
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		height: 100vh;
	}
	
	.loader,
	.loader:before,
	.loader:after {
	  background: #ff8080;
	  -webkit-animation: load1 1s infinite ease-in-out;
	  animation: load1 1s infinite ease-in-out;
	  width: 1em;
	  height: 4em;
	}
	.loader {
	  color: #ff8080;
	  text-indent: -9999em;
	  margin: 88px auto;
	  position: relative;
	  font-size: 11px;
	  -webkit-transform: translateZ(0);
	  -ms-transform: translateZ(0);
	  transform: translateZ(0);
	  -webkit-animation-delay: -0.16s;
	  animation-delay: -0.16s;
	}
	.loader:before,
	.loader:after {
	  position: absolute;
	  top: 0;
	  content: '';
	}
	.loader:before {
	  left: -1.5em;
	  -webkit-animation-delay: -0.32s;
	  animation-delay: -0.32s;
	}
	.loader:after {
	  left: 1.5em;
	}
	@-webkit-keyframes load1 {
	  0%,
	  80%,
	  100% {
	    box-shadow: 0 0;
	    height: 4em;
	  }
	  40% {
	    box-shadow: 0 -2em;
	    height: 5em;
	  }
	}
	@keyframes load1 {
	  0%,
	  80%,
	  100% {
	    box-shadow: 0 0;
	    height: 4em;
	  }
	  40% {
	    box-shadow: 0 -2em;
	    height: 5em;
	  }
	}

</style>
