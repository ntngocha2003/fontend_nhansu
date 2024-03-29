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
    },

    setDeleteRows(state,ids){
        state.data=state.data.filter(({departmentId}) => !ids.includes(departmentId))
    }
}

const getters={
    getPage:(state)=>state.page,
    getData:(state)=>state.data,
    getPagination:(state)=>state.pagination,
}

const actions={
    async getData ({commit},{page,endpoint,query}) {
        let apiUrl=endpoint;

        if(page!=='' && page !==undefined){
            apiUrl+=`?page=${page}`
        }

        if(query !==undefined){
            const queryString=Object.entries(query).map(([key,value])=>`${key}=${value}`).join('&')
            apiUrl+=(apiUrl.includes('?')?'&':'')+queryString
        }
       
        const response =await axios.get(apiUrl)
      
        commit ('setPage',page)
        commit ('setData',response.data.data.data)
        commit ('setPagination',response.data.data)
      },

      async deleteRows({commit},ids){
        try {
            commit('setDeleteRows',ids)
        } catch (error) {
            console.log(error)
        }
      }
   
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}