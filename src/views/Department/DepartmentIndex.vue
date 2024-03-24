<script setup>
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import {ref} from 'vue'

  const itemTitle= ref('Quản lý phòng ban')

</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="page-content">
                <div class="ibox">
                    <Boxtitle></Boxtitle>
                    <div class="ibox-content">
                        <div class="ibox-filter">
                            <form action="" method="">
                                <div class="uk-flex form-content">
                                    <div class="filter-action">
                                        <div class="uk-flex">
                                            <div class="filter-search">
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control uk-input"
                                                />
                                                <button class="uk-button-primary btn-search"><i class="bx bx-search"></i></button>
                                            </div>
                                            <router-link to="" class="link-add"><i class="bx bx-plus"></i>Thêm mới phòng ban</router-link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="ibox-table">
                            <table class="uk-table uk-table-striped set-border">
                                <thead>
                                    <tr class="set-color">
                                        <th class="text-transform text-center">Check</th>
                                        <th class="text-transform text-center">Tên phòng ban</th>
                                        <th class="text-transform text-center">Mô tả</th>
                                        <th class="text-transform text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center set-line">
                                            <input value="" id="checkAll" type="checkbox" class="input-checkbox" />
                                        </td>
                                        <td class="text-center set-line">Table Data</td>
                                        <td class="text-center set-line">Table Data</td>
                                        <td class="text-center set-line">
                                            <router-link to="" class="btn btn-success"><i class='bx bxs-show'></i></router-link>
                                            <router-link to="" class="btn btn-warning"><i class='bx bxs-calendar-edit'></i></router-link>
                                            <router-link to="" class="btn btn-danger "><i class='bx bxs-trash' ></i></router-link>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="text-center set-line">
                                            <input value="" id="checkAll" type="checkbox" class="input-checkbox" />
                                        </td>
                                        <td class="text-center set-line">Table Data</td>
                                        <td class="text-center set-line">Table Data</td>
                                        <td class="text-center set-line">
                                            <router-link to="" class="btn btn-success"><i class='bx bxs-show'></i></router-link>
                                            <router-link to="" class="btn btn-warning"><i class='bx bxs-calendar-edit'></i></router-link>
                                            <router-link to="" class="btn btn-danger "><i class='bx bxs-trash' ></i></router-link>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    .text-transform{

        text-transform: capitalize;
    }
    .text-center{
        text-align: center;
    }
    .set-color{
        background-color: #eeeeeeb8;
    }
    .set-border{
        border: 1px solid #ddd;
    }
    .set-line{
        border-right: 1px solid #ccc;
    }
    .form-content{
        float: right;
        margin-right: 20px;
        margin-bottom: 10px;
    }
    .link-add{
        background-color: #2fd356cc;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: 600;
        display: flex;
        align-items: center;
    }
    .filter-search{
        position: relative;
        margin-right: 18px;
    }
    .btn-search{
        padding: 8px 14px;
        font-size: 16px;
        border-radius: 5px;
        background-color: #64B5F6;
        position: absolute;
        right: 0;
        top: 0;
        border: 1px solid #ccc;
        bottom: 0;
    }
    .form-control{
        width: 244px;
        padding: 8px;
        color: #aaa;
        border-radius: 3px;
    }
    .form-control:focus{
        border-style:solid;
    }
</style>