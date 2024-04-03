<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import {ref} from 'vue'
 
  const itemTitle= ref('Quản lý chức vụ')
  const boxTitle= ref('Danh sách chức vụ')
  const boxFilter= ref({
    createText:'Thêm mới chức vụ',
    createLink:'/position/create'
  })
  const table= ref({
    content:{
        name:['Tên chức vụ','Số nhân viên','Mô tả'],
        value:['name','employees_count','description']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/position/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/position/delete'
        }
    ]
  })

  const endpoint=ref('/Positions')
  const model=ref('Position')
  const tasks=ref({
    deleteMultiple:'/position/deleteMultiple',
    deleteId:'/position/delete'
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