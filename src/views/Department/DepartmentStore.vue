<script setup>
  
  import {ref} from 'vue'
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import Boxtitle from '@/components/Boxtitle.vue'

  const itemTitle= ref('Thêm mới phòng ban')
 
</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="" style="background-color: #eee;">
                <div uk-gird class="gird">
                    <div class="uk-width-2-5@m">
                        <div class="panel-card">
                            Thông tin chung
                        </div>
                        <div class="panel-body">
                            <div>
                                Nhập thông tin phòng ban
                            </div>
                            <div>
                                Lưu ý những trường có dấu 
                                <span class="uk-text-danger">(*)</span> là bắt buộc
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-3-5@m content-store">
                        <div class="ibox">
                            <div class="ibox-content">
                                <div uk-gird class="list-content gird" >
                                    <div class="uk-width-1-2@m uk-first">
                                        <div class="form-row">
                                            <div class="label">
                                                Nhập tên phòng ban (*)
                                            </div>
                                        </div>
                                        <input 
                                        type="text"
                                        class="uk-input input-content"
                                        />
                                    </div>

                                    <div class="uk-width-1-2@m">
                                        <div class="form-row">
                                            <div class="label">
                                                Nhập tên phòng ban (*)
                                            </div>
                                        </div>
                                        <input 
                                        type="text"
                                        class="uk-input input-content"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="uk-flex uk-flex-right">
                                <button class="uk-button-primary btn-store">Lưu thông tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>