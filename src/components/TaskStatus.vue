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
                axios.get(`http://127.0.0.1:8000/results/${this.taskID}`)
                    .then((res) => {
                    	console.log(res.data)
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
			this.t = setInterval(this.pollResults, 1000)
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
	    background: rgba(244, 88, 102, 1);
	    border-width: 1px;
	    border: 2px solid rgba(244, 88, 102, 1);
	    cursor: pointer;
	    transition: .5s;
	    font-size: 1rem;
	    font-weight: bold;
	    text-decoration: none;
	}

	.download-link:hover {
	    color: rgba(244, 88, 102, 1);
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
	
	.loader {
	  color: rgba(244, 88, 102, 1);;
	  font-size: 90px;
	  text-indent: -9999em;
	  overflow: hidden;
	  width: 1em;
	  height: 1em;
	  border-radius: 50%;
	  margin: 72px auto;
	  position: relative;
	  -webkit-transform: translateZ(0);
	  -ms-transform: translateZ(0);
	  transform: translateZ(0);
	  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
	  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
	}
	@-webkit-keyframes load6 {
	  0% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	  5%,
	  95% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	  10%,
	  59% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
	  }
	  20% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
	  }
	  38% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
	  }
	  100% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	}
	@keyframes load6 {
	  0% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	  5%,
	  95% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	  10%,
	  59% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
	  }
	  20% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
	  }
	  38% {
	    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
	  }
	  100% {
	    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
	  }
	}
	@-webkit-keyframes round {
	  0% {
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }
	  100% {
	    -webkit-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
	@keyframes round {
	  0% {
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }
	  100% {
	    -webkit-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
</style>
