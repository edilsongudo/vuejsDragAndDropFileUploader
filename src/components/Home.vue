<script>
	import { useRouter, useRoute } from 'vue-router'

    export default {
	  	setup() {
		    const router = useRouter()
		    const route = useRoute()
	    },
        data() {
            return {
                file: null,
                fileID: null,
                chunks: [],
                uploaded: 0,
                percentage: 0,
                ishover: false,
                taskID: null,
            };
        },

        computed: {
            formData() {
                let formData = new FormData;
                formData.set('file', this.chunks[0], `${this.fileID}.ext.part-${this.pad(this.chunks.indexOf(this.chunks[0]))}`);
                formData.set('filename', this.file.name);
                formData.set('is_last', this.chunks.length === 1);

                return formData;
            },
            config() {
                return {
                    method: 'POST',
                    data: this.formData,
                    url: 'http://127.0.0.1:8000/fileUploader/',
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    },
                    onUploadProgress: event => {
                        this.uploaded += event.loaded;
                        this.percentage = Math.floor((this.uploaded / this.file.size) * 100)
                    }
                };
            }
        },

        methods: {
            pad(val) {
               	let str = '' + val
                let pad = '0000'
                let ans = pad.substring(0, pad.length - str.length) + str
                return ans
            },
            ondrop(e) {
            	e.dataTransfer.effectAllowed = 'move'
            	this.ishover = false
            	this.file = e.dataTransfer.files.item(0)
                this.createChunks();
                this.upload()
            },
            ondragover(e) {
            	this.ishover = true
            },
            ondragleave(e) {
            	this.ishover = false
            },
            select(event) {
                this.file = event.target.files.item(0);
                this.createChunks();
                this.upload()
            },
            generateUniqueID() {
            	return Math.floor(Math.random() * Date.now())
            },
            upload() {
                axios(this.config).then(response => {
                	this.chunks.shift();
                	if (this.chunks.length > 0) {
                    	this.upload()
                	} else {
                		this.taskID = response.data.taskID
                	}
                }).catch(error => {});
            },
            createChunks() {
                let size = 1024 * 200, chunks = Math.ceil(this.file.size / size);

                for (let i = 0; i < chunks; i++) {
                    let chunk = this.file.slice(
                        i * size, Math.min(i * size + size, this.file.size), this.file.type
                    );
                    this.chunks.push(chunk)
                    this.fileID = this.generateUniqueID()
                }
            }
        }
    }
</script>

<template>
	<div class="container">
		<div v-if="!file">
			<h1>Audio to text converter</h1>
		    <div class="drop-box-container">
		        <div @drop.prevent="ondrop" @dragover.prevent="ondragover" @dragleave.prevent="ondragleave" class="drop-box" :class="{hover: ishover}" id="dropBox">
		            <p><i class="fad fa-cloud-upload"></i></p>
		            <p>Drag & Drop to Upload File</p>
		            <form enctype="multipart/form-data" method="POST" action="">
		                <p>or</p>
		                <!-- {% csrf_token %} -->
		                <div>
		                    <label for="fileupload" class="custom-file-upload"><i class="fal fa-file-audio"></i> SELECT FILE</label>
		                    <input @change="select" type="file" id="fileupload" placeholder="Select file">
		                </div>    
		            </form>
		        </div>
		    </div>
		</div>
		<div v-else-if="file && !taskID">
			<ProgressBar :filename="file.name" :percentage="percentage"/>
		</div>
		<div v-else>
			<TaskStatus :taskID="taskID" :filename="file.name"/>
		</div>
	</div>
</template>

<style scoped>
	:root {
	    --primary-color: rgba(244, 88, 102, 1);
	}

	@font-face {
	    font-family: 'Averta';
	    src: url('../assets/fonts/averta/AvertaDemoPECuttedDemo-Regular.otf')
	}

	.container {
		text-align: center;
	    font-family: 'Averta';
	    font-size: min(16px, 4vw); 
	}

	h1 {
	    font-size: max(30px, 5vw);
	}

	#myProgress {
	    width: 100%;
	}

	#uploaded_files {
	    margin-top: 25px;
	    display: flex;
	}

	label {
	    font-weight: bold;
	}

	.file-details {
	    margin-top: -2px;
	    padding-left: 10px;
	    width: 100%;
	}

	.file-details p {
	    margin-bottom: -7px;
	}

	small {
	    margin-top: 0;
	    color: black;
	}

	.drop-box-container {
	    width: 90%;
	    max-width: 1200px;
	    margin: 100px auto; 
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    background: rgba(244, 88, 102, 0.15);
	    padding: 10px;
	}

	.drop-box {
	    width: 100%;
	    border: 2px dashed rgba(244, 88, 102, 1); 
	    display: flex; 
	    flex-direction: column; 
	    justify-content: center; 
	    align-items: center;
	    text-align: center;
	    background: rgba(244, 88, 102, 0.2);
	}

	.drop-box.hover {
	    background: rgba(244, 88, 102, 0.3)
	}

	@media only screen and (max-width: 800px) {
	  .drop-box-container {
	    width: 90%;
	  }
	}

	.drop-box p {
	    text-align: center; 
	    vertical-align: middle; 
	    color: rgba(244, 88, 102, 1);
	}

	.drop-box p i {
	    font-size: max(5rem, 10vw);
	    color: rgba(244, 88, 102, 1);
	}

	input[type="file"] {
	    display: none;
	}

	label.custom-file-upload {
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
	}

	label.custom-file-upload:hover {
	    color: rgba(244, 88, 102, 1);
	    background: transparent;
	}
</style>
