import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ProgressBar from './components/ProgressBar.vue'
import TaskStatus from './components/TaskStatus.vue'

const app = createApp(App)

app.use(router)

app.component('ProgressBar', ProgressBar)
app.component('TaskStatus', TaskStatus)
app.mount('#app')
