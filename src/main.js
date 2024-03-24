import './assets/main.css'

import { createApp } from 'vue'
import store from './store/index.js'
import App from './App.vue'
import router from './router'
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import toast from 'vue3-toastify'

UIkit.use(Icons);
// import 'boxicons/css/boxicons.min.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(toast,{
    position:'top-right',
    timeout:3000,
    closeOnClick:true,
    pauseOnFocusLoss:true
})

app.mount('#app')
