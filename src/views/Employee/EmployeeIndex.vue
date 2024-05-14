<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onBeforeUnmount} from 'vue'
 
  const itemTitle= ref('Quản lý nhân viên')
  const boxTitle= ref('Danh sách nhân viên')
  const boxFilter= ref({
    createText:'Thêm mới nhân viên',
    createLink:'/employee/create'
  })
  const table= ref({
    content:{
        name:['Tên nhân viên','Email','Điện thoại','Tuổi','Địa chỉ'],
        value:['name','email','phone','age','address']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/employee/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/employee/delete'
        },

        // {
        //     class:'btn btn-success ml10' ,
        //     icon:'bx bxs-show',
        //     route:'/employee/detail'
        // },
        
    ]
  })

  const endpoint=ref('/Employees')
  const model=ref('Employee')
  const tasks=ref({
    deleteMultiple:'/employee/deleteMultiple',
    deleteId:'/employee/delete'
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