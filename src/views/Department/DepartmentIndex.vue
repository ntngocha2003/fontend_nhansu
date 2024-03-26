<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'
  import BoxFilter from '@/components/BoxFilter.vue'
  import Table from '@/components/Table.vue'
  import {ref} from 'vue'

  const itemTitle= ref('Quản lý phòng ban')
  const boxTitle= ref('Danh sách phòng ban')
  const boxFilter= ref({
    createText:'Thêm mới phòng ban',
    createLink:'/department/store'
  })
  const table= ref({
    thead:['Tên phòng ban','Mô tả'],
    data:[
        {
            name:"Phòng quản lý",
            description:" Phòng này quản lý công ty"
        }
    ],
    // route:{
    //     update:'/department/update',
    //     delete:'/department/delete'
    // },
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

</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="page-content">
                <div class="ibox">
                    <Boxtitle :boxTitle="boxTitle"></Boxtitle>
                    <div class="ibox-content">  
                        <BoxFilter :boxFilter="boxFilter"></BoxFilter>        
                        <Table :table="table"></Table>
                    </div>
                </div>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>