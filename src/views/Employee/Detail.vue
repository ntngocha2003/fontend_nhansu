<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Detail from '@/components/Detail.vue'
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onMounted,onBeforeUnmount} from 'vue'
  import { useRouter } from 'vue-router';
  const router=useRouter();
 
  const itemTitle= ref('Chi tiết nhân viên')

  const url=router.currentRoute.value.name.split('.')
  const id=router.currentRoute.value.params.id;

  const formData=ref({
    id:'',
    name:'',
    email:'',
    phone:'',
    age:'',
    address:'',
    identification:'',
    departmentId: '0',
    positionId:'0',
    levelId :'0',
    specializedId:'0',
    salaryId:'0',
  })

    const getEmployees= async()=>{
        
        try {
            const response=await axios.get('/employee/' +id)
            formData.value.name=response.data.data.name
            formData.value.email=response.data.data.email
            formData.value.phone=response.data.data.phone
            formData.value.age=response.data.data.age
            formData.value.address=response.data.data.address
            formData.value.identification=response.data.data.identification
            formData.value.departmentId=response.data.data.departmentId
            formData.value.positionId=response.data.data.positionId
            formData.value.levelId=response.data.data.levelId
            formData.value.specializedId=response.data.data.specializedId
            formData.value.salaryId=response.data.data.salaryId  
           
        } catch (error) {
            console.log(error)
        }    
    }

  onMounted(()=>{
    getEmployees()
  })


</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="page-content">
                <div class="ibox">          
                    <div class="ibox-content">  
                       <!-- <Detail :formData="formData"></Detail> -->
                    </div>
                </div>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>