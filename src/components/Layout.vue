<script setup>
    import { onBeforeMount } from 'vue';
    import store from '@/store/index.js'
    import Sidebar from './Sidebar.vue';
    import Navbar from './Navbar.vue';
    import {toast} from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const setToken=()=>{
        const token=localStorage.getItem('token')
        store.commit('auth/setToken',token)
    }

    const showNotify=()=>{
        const message=store.getters['toast/getMessage']
        const type=store.getters['toast/getType']
        if(message !==null){
            if(type=='success'){
                toast.success(message);
                store.dispatch('toast/removeMessage')
            }
            else{
                toast.error(message);
                store.dispatch('toast/removeMessage')
            }
        }
        
    }

    onBeforeMount(()=>{
        setToken();
        showNotify();
    })
</script>

<template>
    <div id="wrapper"class="dashboard">
       <Sidebar></Sidebar>

       <div class="page-wrapper">

            <Navbar></Navbar>

            <div class="page-container">
                <slot name="template"></slot>

            </div>

       </div>
    </div>
</template>

<style scoped>
    .page-container{     
        background-color: #fff;
        margin-top: 10px;
    }
</style>