<script setup>
  import axios, { cancelPendingRequest } from '@/config/axios'
  import {ref,onMounted,onBeforeUnmount} from 'vue'
  import Layout from '@/components/Layout.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'
  import Multiselect from '@vueform/multiselect'
  import useSalarys from '@/services/salary.js'
  import {useLevels,fetchSpecialized} from '@/services/level.js'
  import {useDepartments,fetchPosition} from '@/services/department.js'
  import {setupDataDropboxSalary} from '@/setups/setupSalary.js'
  import {setupDataDropbox} from '@/setups/setup.js'
  const router=useRouter();
  const store=useStore();

  const itemTitle= ref('Thêm mới nhân viên')
  
  const formData=ref({
    id:'',
    name:'',
    email:'',
    phone:'',
    age:'',
    address:'',
    identification:'',
    departmentId: '0',
    positionId:'0',
    levelId :'0',
    specializedId:'0',
    salaryId:'0'
  })

    const nameError = ref('')
    const emailError = ref('')
    const addressError = ref('')
    // const departmentError = ref('')
    // const leveError = ref('')
    // const positionError = ref('')

    const url=router.currentRoute.value.name.split('.')
    const action=url[url.length-1]
    const id=router.currentRoute.value.params.id;
   

  const save = async()=>{
    try {
        let response
        if(action==='update'){          
            response=await axios.put('/employee/update/'+id,formData.value)
        }
        else if(action==='create'){
            response=await axios.post('/employee/store/',formData.value)
        }
        store.dispatch('toast/showMessage',{message:response.data.message, type:'success'})
        router.push({name: 'employee.index'})
       
    } catch (error) {
        console.log(error)
        if(error.response.data.errors){
            nameError.value=error.response.data.errors.name
            emailError.value = error.response.data.errors.email
            addressError.value = error.response.data.errors.address
          }
          else{
           nameError.value=''
           emailError.value=''
           addressError.value = error.response.data.message
          }
    }
  }

  const identifyAction= async()=>{
    if(action==='update'){ 
        itemTitle.value='Cập nhật nhân viên' 
            try {
                const response=await axios.get('/employee/' +id)
                formData.value.name=response.data.data.name
                formData.value.email=response.data.data.email
                formData.value.address=response.data.data.address
            } catch (error) {
                console.log(error)
            }    
    }
    
  }
  const {salarys,getSalarys}=useSalarys();
  const {departments,getDepartments}=useDepartments();
  const {levels,getLevels}=useLevels();

  const isLoading=ref(false);

  const lacations=ref({
    positions:[],
    specializeds:[]
  })


  const getPosition= async (id,relation)=>{
    if(relation==='positions'){
        formData.value.positionId='0'
    }

    lacations.value[relation]=await fetchPosition(id,relation);

  }

  const getSpecialized= async (id,relation)=>{
    if(relation==='specializeds'){
        formData.value.specializedId='0'
    }

    lacations.value[relation]=await fetchSpecialized(id,relation);

  }

  onMounted(()=>{
    identifyAction()
    getSalarys()
    getDepartments()
    getLevels()
    isLoading.value=true
  })

</script>

<template>
  <Layout>
        <template #template>
            <Breadcrumb :itemTitle="itemTitle"></Breadcrumb>
            <div class="line"></div>
            <div class="" style="background-color: #eeeeeeb5;padding: 20px 10px;">
                <form @submit.prevent="save()" action="">
                    <div uk-gird class="gird" style="margin-top: -20px;margin-bottom: 15px;">
                        <div class="uk-width-2-5@m">
                            <div class="panel-card">
                                Thông tin chung
                            </div>
                            <div class="panel-body">
                                <div>
                                    Nhập thông tin nhân viên
                                </div>
                                <div>
                                    Lưu ý những trường có dấu 
                                    <span class="uk-text-danger">(*)</span> là bắt buộc
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div uk-gird class="gird">
                        <div class="uk-width content-store">
                            <div class="ibox">
                                <div class="ibox-content">
                                    <div uk-gird class="list-content gird" >
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập tên nhân viên (*)
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
                                                   Nhập email (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.email"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="emailError" class="uk-text-danger">{{'*'+ emailError }}</div>
                                        </div>
                                        
                                    </div>
                                    <div uk-gird class="list-content gird" >
    
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập số điện thoại
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.phone"
                                            class="uk-input input-content"
                                            />
                                           
                                        </div>
                                        <div class="uk-width-1-2@m">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập tuổi
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.age"
                                            class="uk-input input-content"
                                            />
                                           
                                        </div>
                                    </div>
                                    <div uk-gird class="list-content gird" >
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập địa chỉ (*)
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.address"
                                            class="uk-input input-content"
                                            />
                                            <div v-if="addressError" class="uk-text-danger">{{'*'+ addressError }}</div>
                                        </div>
    
                                        <div class="uk-width-1-2@m">
                                            <div class="form-row">
                                                <div class="label">
                                                    Nhập căn cước công dân
                                                </div>
                                            </div>
                                            <input 
                                            type="text"
                                            v-model="formData.identification"
                                            class="uk-input input-content"
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                                  
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div uk-gird class="gird">
                        <div class="uk-width content-store">
                            <div class="ibox">
                                <div class="ibox-content">
                                    <div uk-gird class="list-content gird" >
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="">
                                                <div class="label">
                                                    Chọn phòng ban (*)
                                                    <Multiselect
                                                        style="margin-top: 10px;"
                                                        v-if="isLoading"
                                                        v-model="formData.departmentId"
                                                        :options="setupDataDropbox(departments,'Chọn phòng ban')"
                                                        :searchable="true"
                                                        @change="getPosition($event,'positions')"
                                                        >
                                                    </Multiselect>
                                                </div>
                                            </div>
    
                                            <!-- <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div> -->
                                        </div>
    
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="">
                                                <div class="label">
                                                    Chọn chức vụ (*)
                                                    <Multiselect
                                                        style="margin-top: 10px;"
                                                        v-model="formData.positionId"
                                                        :options="setupDataDropbox(lacations.positions, 'Chọn chức vụ')"
                                                        :searchable="true"
                                                        >
                                                    </Multiselect>
                                                </div>
                                            </div>
    
                                            <!-- <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div> -->
                                        </div>
                                    </div>
    
                                    <div uk-gird class="list-content gird" >
    
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="">
                                                <div class="label">
                                                    Chọn trình độ học vấn (*)
                                                    <Multiselect
                                                        style="margin-top: 10px;"
                                                        v-model="formData.levelId"
                                                        :options="setupDataDropbox(levels,'Chọn trình độ')"
                                                        :searchable="true"
                                                        @change="getSpecialized($event,'specializeds')"
                                                        >
                                                    </Multiselect>
                                                </div>
                                            </div>
    
                                            <!-- <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div> -->
                                        </div>
    
                                        <div class="uk-width-1-2@m uk-first">
                                            <div class="">
                                                <div class="label">
                                                    Chọn chuyên ngành (*)
                                                    <Multiselect
                                                        style="margin-top: 10px;"
                                                        v-model="formData.specializedId"
                                                        :options="setupDataDropbox(lacations.specializeds, 'Chọn chuyên ngành')"
                                                        :searchable="true"
                                                        >
                                                    </Multiselect>
                                                </div>
                                            </div>
    
                                            <!-- <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div> -->
                                        </div>
                                    </div>
                                    <div uk-gird class="list-content gird" >
    
                                        <div class="uk-width uk-first">
                                            <div class="" style="margin-bottom: 20px;">
                                                <div class="label">
                                                    Chọn bậc lương (*)
                                                    <Multiselect
                                                        style="margin-top: 10px;"
                                                        v-model="formData.salaryId"
                                                        :options="setupDataDropboxSalary(salarys,'Chọn bậc lương')"
                                                        :searchable="true"
                                                        >
                                                    </Multiselect>
                                                </div>
                                            </div>
    
                                            <!-- <div v-if="nameError" class="uk-text-danger">{{'*'+ nameError }}</div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right">
                        <button class="uk-button-primary btn-store">Lưu thông tin</button>
                    </div>
                </form>
            </div>
        </template>
  </Layout>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>