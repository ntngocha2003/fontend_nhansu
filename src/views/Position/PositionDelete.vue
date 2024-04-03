<script setup>
  import axios from '@/config/axios.js';
  import {ref,onMounted} from 'vue'
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import DeleteForm from '@/components/DeleteForm.vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'

  const router=useRouter();
  const store=useStore();

  const itemTitle= ref('Xóa chức vụ')

  const endpoint=ref('/position/delete/')

  const formDelete=ref({})

  const redirect=ref('position.index')

  const getDepartment=async()=>{
    const id=router.currentRoute.value.params.id
    try {
        const response=await axios.get('/position/' + id)
        formDelete.value=response.data.data
    } catch (error) {
        if(error.response.status===404){
            router.push({name:'position.index'})
        }
        console.log(error)
    }
  }

  onMounted(() => {
    getDepartment();
    })
</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="" style="background-color: #eeeeeeb5;padding: 20px 10px;">
                <DeleteForm :endpoint="endpoint" :formDelete="formDelete" :redirect="redirect"></DeleteForm>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>