<script setup>
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onMounted,onBeforeUnmount} from 'vue'
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'
  import Multiselect from '@vueform/multiselect'
  import {setupDataDropbox} from '@/setups/setup.js'
  const router=useRouter();
  const store=useStore();

  const itemTitle= ref('Thêm mới mức lương')
  
  const formData=ref({
    id:'',
    salaryStep:'',
    basicSalary:'',
    coefficientsSalary:'',
    allowanceCoefficient:''
  })

    const stepError = ref('')
    const basicError = ref('')
    const coefficientsSalaryError = ref('')
    const allowanceError = ref('')

    const url=router.currentRoute.value.name.split('.')
    const action=url[url.length-1]
    const id=router.currentRoute.value.params.id;
   

  const save = async()=>{
    try {
        let response
        if(action==='update'){          
            response=await axios.put('/salary/update/'+id,formData.value)
        }
        else if(action==='create'){
            response=await axios.post('/salary/store/',formData.value)
        }
        store.dispatch('toast/showMessage',{message:response.data.message, type:'success'})
        router.push({name: 'salary.index'})
       
    } catch (error) {
        console.log(error)
        if(error.response.data.errors){
            stepError.value=error.response.data.errors.salaryStep
            basicError.value = error.response.data.errors.basicSalary
            coefficientsSalaryError.value=error.response.data.errors.coefficientsSalary
            allowanceError.value = error.response.data.errors.allowanceCoefficient
          }
          else{
           stepError.value=''
           basicError.value=''
           coefficientsSalaryError.value=''
           allowanceError.value = error.response.data.message
          }
    }
  }

  const identifyAction= async()=>{
    if(action==='update'){ 
        itemTitle.value='Cập nhật mức lương' 
            try {
                const response=await axios.get('/salary/' +id)
                formData.value.salaryStep=response.data.data.salaryStep
                formData.value.basicSalary=response.data.data.basicSalary
                formData.value.coefficientsSalary=response.data.data.coefficientsSalary
                formData.value.allowanceCoefficient=response.data.data.allowanceCoefficient
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
                                    Nhập thông tin mức lương
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
                                                    Nhập bậc lương (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.salaryStep"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="stepError" class="uk-text-danger">{{'*'+ stepError }}</div>
                                        </div>
    
                                        <div class="uk-width-1-2@m">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập lương cơ bản (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.basicSalary"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="basicError" class="uk-text-danger">{{'*'+ basicError }}</div>
                                        </div>
                                    </div>
                                    <div uk-gird class="list-content gird" >
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập hệ số lương (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.coefficientsSalary"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="coefficientsSalaryError" class="uk-text-danger">{{'*'+ coefficientsSalaryError }}</div>
                                        </div>
    
                                        <div class="uk-width-1-2@m">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập hệ số phụ cấp (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.allowanceCoefficient	"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="allowanceError" class="uk-text-danger">{{'*'+ allowanceError }}</div>
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

<style src="@vueform/multiselect/themes/default.css"></style>