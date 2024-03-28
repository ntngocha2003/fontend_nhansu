import {createStore} from 'vuex'
import authStore from '@/store/auth/auth.js'
import toastStore from '@/store/toast/toast.js'
import paginationStore from './pagination/pagination'

const store = createStore({
    modules:{
        auth:authStore,
        toast: toastStore,
        pagination:paginationStore,
    }
  })

export default store