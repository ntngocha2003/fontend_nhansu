import {createStore} from 'vuex'
import authStore from '@/store/auth/auth.js'
import toastStore from '@/store/toast/toast.js'

const store = createStore({
    modules:{
        auth:authStore,
        toast: toastStore
    }
  })

export default store