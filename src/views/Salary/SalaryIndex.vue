<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onBeforeUnmount} from 'vue'
 
  const itemTitle= ref('Quản lý lương')
  const boxTitle= ref('Danh sách lương')
  const boxFilter= ref({
    createText:'Thêm mới lương',
    createLink:'/salary/create',
    class:'none' ,
  })
  const table= ref({
    content:{
        name:['Bậc lương','Lương cơ bản', 'Hệ số lương', 'Hệ số phụ cấp'],
        value:['salaryStep','basicSalary','coefficientsSalary','allowanceCoefficient']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/salary/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/salary/delete'
        }
    ]
  })

  const endpoint=ref('/Salarys')
  const model=ref('Salary')
  const tasks=ref({
    deleteMultiple:'/salary/deleteMultiple',
    deleteId:'/salary/delete'
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