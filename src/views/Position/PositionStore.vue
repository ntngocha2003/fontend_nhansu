<script setup>
  import axios from '@/config/axios.js';
  import {ref,onMounted} from 'vue'
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'

  const router=useRouter();
  const store=useStore();

  const itemTitle= ref('Thêm mới chức vụ')
  const formData=ref({
    name:'',
    description:''
  })

    const nameError = ref('')
    const descriptionError = ref('')

    const url=router.currentRoute.value.name.split('.')
    const action=url[url.length-1]
    const id=router.currentRoute.value.params.id;
   

  const save = async()=>{
    try {
        let response
        if(action==='update'){          
            response=await axios.put('/position/update/'+id,formData.value)
        }
        else if(action==='create'){
            response=await axios.post('/position/store/',formData.value)
        }
        store.dispatch('toast/showMessage',{message:response.data.message, type:'success'})
        router.push({name: 'position.index'})
       
    } catch (error) {
        console.log(error)
        if(error.response.data.errors){
            nameError.value=error.response.data.errors.name
            descriptionError.value = error.response.data.errors.description
          }
          else{
           nameError.value=''
           descriptionError.value = error.response.data.message
          }
    }
  }

  const identifyAction= async()=>{
    if(action==='update'){ 
        itemTitle.value='Cập nhật chức vụ' 
            try {
                const response=await axios.get('/position/' +id)
                formData.value.name=response.data.data.name
                formData.value.description=response.data.data.description
            } catch (error) {
                console.log(error)
            }    
    }
    
  }
  onMounted(()=>{
    identifyAction()
  })

</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="" style="background-color: #eeeeeeb5;padding: 20px 10px;">
                <form @submit.prevent="save()" action="">
                    <div uk-gird class="gird">
                        <div class="uk-width-2-5@m">
                            <div class="panel-card">
                                Thông tin chung
                            </div>
                            <div class="panel-body">
                                <div>
                                    Nhập thông tin chức vụ
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
                                                    Nhập tên chức vụ (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.name"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div>
                                        </div>
    
                                        <div class="uk-width-1-2@m">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập mô tả chức vụ (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.description"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="descriptionError" class="uk-text-danger">{{'*'+ descriptionError }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="uk-flex uk-flex-right">
                                    <button class="uk-button-primary btn-store">Lưu thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </template>
  </Layout>
</template>

<style scoped>
    
</style>