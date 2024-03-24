import axios from '@/config/axios.js';
import csrf from '@/config/csrf';

const state={
        authCheck: false,
        token:null,
        user:null
      }
 const mutations= {
        loginAdmin(state, {authCheck,token,user}){
          state.authCheck=true
          state.token=token
          state.user=user
        },
        setToken(state,token){
          state.token=token
        }
      }

const getters={
    getToken:(state)=>state.token
    }
const actions= {
  
          async loginAdmin ({commit},{email,password}) {
          // await csrf.getCookie()
          const response =await axios.post('/login',{
              email,
              password
          })
         
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('token_expires',response.data.token_expires_at)
          commit ('loginAdmin',{authCheck:true,token:response.data.token, user:response.admin})
        }
      }

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}