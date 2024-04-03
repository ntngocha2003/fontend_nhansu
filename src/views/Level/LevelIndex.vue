<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import {ref} from 'vue'
 
  const itemTitle= ref('Quản lý trình độ')
  const boxTitle= ref('Danh sách trình độ')
  const boxFilter= ref({
    createText:'Thêm mới trình độ',
    createLink:'/level/create'
  })
  const table= ref({
    content:{
        name:['Tên trình độ','Số nhân viên','Mô tả'],
        value:['name','employees_count','description']
    },
    data:[],
   
    actions:[
        {
            class:'btn btn-warning ml10' ,
            icon:'bx bxs-calendar-edit',
            route:'/level/update'
        },
        {
            class:'btn btn-danger ml10' ,
            icon:'bx bxs-trash',
            route:'/level/delete'
        }
    ]
  })

  const endpoint=ref('/Levels')
  const model=ref('Level')
  const tasks=ref({
    deleteMultiple:'/level/deleteMultiple',
    deleteId:'/level/delete'
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