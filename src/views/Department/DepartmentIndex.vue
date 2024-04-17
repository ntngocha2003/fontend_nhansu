<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import {ref,onBeforeUnmount} from 'vue'
  import axios, { cancelPendingRequest } from '@/config/axios'

  const itemTitle= ref('Quản lý phòng ban')
  const boxTitle= ref('Danh sách phòng ban')
  const boxFilter= ref({
    createText:'Thêm mới phòng ban',
    createLink:'/department/create'
  })
  
  const table= ref({
    content:{
        name:['Tên phòng ban','Số nhân viên','Mô tả'],
        value:['name','employees_count','description']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/department/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/department/delete'
        }
    ]
  })

 
  const endpoint=ref('/Departments')
  const model=ref('Department')
  const tasks=ref({
    deleteMultiple:'/department/deleteMultiple',
    deleteId:'/department/delete'
  })

  onBeforeUnmount(()=>{
    cancelPendingRequest(axios.defaults);
    
  })

</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="page-content">
                <div class="ibox">
                    <Boxtitle :boxTitle="boxTitle":model="model"></Boxtitle>
                    <div class="ibox-content">  
                        <BoxFilter :boxFilter="boxFilter"></BoxFilter>        
                        <Table :table="table" :endpoint="endpoint" :model="model" :tasks="tasks"></Table>
                    </div>
                </div>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>