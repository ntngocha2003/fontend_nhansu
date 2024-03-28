import axios from '@/config/axios.js';
import csrf from '@/config/csrf';

const state={
    page:'1',
    data:null,
    pagination:[]
}

const mutations={
    setPage(state,page){
        state.page=page
    },
    setData(state,data){
        state.data=data
    },
    setPagination(state,pagination){
        state.pagination=pagination
    }
}

const getters={
    getPage:(state)=>state.page,
    getData:(state)=>state.data,
    getPagination:(state)=>state.pagination,
}

const actions={
    async getData ({commit},{page,endpoint}) {
        const apiUrl=endpoint +((page !=='')? '?page='+page:'');
        await csrf.getCookie()
        const response =await axios.get(apiUrl)
      
        commit ('setPage',page)
        commit ('setData',response.data.data.data)
        commit ('setPagination',response.data.data)
      }
   
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}