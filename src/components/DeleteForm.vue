<script setup>
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    const {endpoint,department,redirect} = defineProps(['endpoint','department','redirect']);
    const router=useRouter()
    import {useStore} from 'vuex'
    const store=useStore();

    const destroy =async () =>{
        const id=router.currentRoute.value.params.id;
        if(window.confirm('Bạn có chắc chắc xóa dữ liệu này không ?')){
            try {
                const response=await axios.delete(endpoint +id)
                store.dispatch('toast/showMessage',{message:response.data.message, type:'success'})
                router.push({name: redirect})
            } catch (error) {
                console.log(error)
            }
        }
    }
    

</script>

<template>
    <form  action=""@submit.prevent="destroy">
        <div uk-gird class="gird">
            <div class="uk-width-2-5@m">
                <div class="panel-card">
                    Thông tin dữ liệu sẽ xóa
                </div>
                <div class="panel-body">
                    <div>
                        Bạn có chắc chắn muốn xóa không
                    </div>
                    <div>
                        Lưu ý dữ liệu đã xóa không thể khôi phục
                        <span class="uk-text-danger">(*)</span>
                    </div>
                </div>
            </div>
            <div class="uk-width-3-5@m content-store">
                <div class="ibox">
                    <div class="ibox-content">
                        <div uk-gird class="list-content gird" >
                            <div class="uk-width-1-1@m uk-first">
                                <div class="form-row">
                                    <div class="label">
                                        Tên bản ghi muốn xóa (*)
                                    </div>
                                </div>
                                <input 
                                type="text"
                                v-model="department.nameDepartment"
                                class="uk-input input-content"
                                readonly
                                />
                               
                            </div>
    
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right">
                        <button class="uk-button-danger btn-store">Xóa dữ liệu</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
