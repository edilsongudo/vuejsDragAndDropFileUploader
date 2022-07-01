import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ProgressBar from './components/ProgressBar.vue'

const app = createApp(App)

app.use(router)

app.component('ProgressBar', ProgressBar)
app.mount('#app')
