const state={
    message:null,
    type:null
}

const mutations={
    setMessage(state,{message,type}){
        state.message=message
        state.type=type
    },
    clearMessage(state){
        state.message=null;
        state.type=null
    }
}

const getters={
    getMessage:(state)=>state.message,
    getType:(state)=>state.type,
}

const actions={
    showMessage({commit},{message,type}){
        commit('setMessage',{message,type})
    },
    removeMessage({commit}){
        commit('clearMessage')
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}