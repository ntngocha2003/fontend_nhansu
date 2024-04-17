<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onBeforeUnmount} from 'vue'
 
  const itemTitle= ref('Quản lý chuyên ngành')
  const boxTitle= ref('Danh sách chuyên ngành')
  const boxFilter= ref({
    createText:'Thêm mới chuyên ngành',
    createLink:'/specialized/create'
  })
  const table= ref({
    content:{
        name:['Tên chuyên ngành','Số nhân viên','Mô tả'],
        value:['name','employees_count','description']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/specialized/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/specialized/delete'
        }
    ]
  })

  const endpoint=ref('/Specializeds')
  const model=ref('Specialized')
  const tasks=ref({
    deleteMultiple:'/specialized/deleteMultiple',
    deleteId:'/specialized/delete'
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