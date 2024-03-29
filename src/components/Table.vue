<script setup>
    import {ref,onMounted, computed} from 'vue'
    import {useStore} from 'vuex'
    import axios from '@/config/axios.js';
    const store=useStore();
    import { useRouter } from 'vue-router';
    import bus from '@/events/EventBus.js';
    import {toast} from 'vue3-toastify';
 
    const router=useRouter();
    const {table,endpoint,model,tasks} = defineProps(['table','endpoint','model','tasks']);

    const tableData=computed(()=>{
        return store.getters['pagination/getData']      
    })

    const pagination=computed(()=>{
        return store.getters['pagination/getPagination']      
    })

    const allChecked=ref(false);
    const selectedRow=ref([]);

    const renderView=async (page,query) => {
        try {
            page =(typeof page !=='undefined') ? page :'';
            await store.dispatch('pagination/getData',{page:page, endpoint:endpoint,query:query});

            router.push({query:{page:page || '1'}})

        } catch (error) {
            console.log(error)
        }
    }
    const emitSearch=()=>{
        bus.on('searchTable',searchData=>{
            const searchPage=1;
            renderView(searchPage,searchData)
        })
    }

    // const deleteRow = async(id)=>{
    //     if(window.confirm('Bạn có chắc chắc xóa dữ liệu này không ?')){
    //            try {
    //             console.log(156)
    //                 const apiUrl=`${tasks.deleteId}?ids=${ids.join(',')}`
    //                 const response=await axios.delete(apiUrl);
    //                 await store.dispatch('pagination/deleteRows',ids)
    //                 selectedRow.value=[]
    //                 toast.success(response.data.message);
                   
    //            } catch (error) {
    //                 console.log(error)
    //            }
    //        }
    // }

    const deleteMultiple= async()=>{
        bus.off('delete-row'),
        bus.on('delete-row',async data=>{
           const ids=selectedRow.value.map(index=>tableData.value[index].departmentId);
           if(ids.length===0){
            toast.error('Bạn chưa chọn dữ liệu để xóa')
            return
           }
           if(window.confirm('Bạn có chắc chắc xóa các dữ liệu này không ?')){
               try {
                    const apiUrl=`${tasks.deleteMultiple}?ids=${ids.join(',')}`
                    const response=await axios.delete(apiUrl);
                    await store.dispatch('pagination/deleteRows',ids)
                    selectedRow.value=[]
                    toast.success(response.data.message);
                   
               } catch (error) {
                    console.log(error)
               }
           }
           
        })
    }

    const checkAll=()=>{
        if(allChecked.value){
            selectedRow.value=tableData.value.map((_,index)=>index)
        }
        else{
            selectedRow.value=[]
        }
    }

    const isChecked=(key)=>{
        return selectedRow.value.includes(key);
    }

    const updateCheckedAll=(event,key)=>{
        const totalRow=tableData.value.length
        allChecked.value=(totalRow===selectedRow.value.length)?true :false;
    }

    onMounted(() => {
      renderView()
      emitSearch();
      deleteMultiple();
    })

</script>

<template>
    <div class="ibox-table">
        <table class="uk-table uk-table-striped set-border">
            <thead>
                <tr class="set-color">
                    <th class="text-transform text-center">
                        <input class="input-checkbox" type="checkbox" value="" v-model="allChecked" @change="checkAll" />
                    </th>
                    <th v-for="(val,key) in table.content.name":key="key" class="text-transform text-center">{{ val }}</th>
                    <th class="text-transform text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="tableData!==null">
                    <tr v-for="(val,key) in tableData":key="key" :class="{'selected-row':selectedRow.includes(key)}">
                        <td class="text-center set-line">
                            <input 
                                :value=key
                                id="checkAll" 
                                type="checkbox"
                                v-model="selectedRow" 
                                class="input-checkbox"
                                @change="updateCheckedAll($event,key)" />
                        </td>
                        <td v-for="(content,index) in table.content.value":key="index" class="text-center set-line">{{ val[content] }}</td>
                        <td class="text-center set-line">
                            <template v-if="table.actions.length>0">
                                <router-link 
                                    v-for="(action, actionKey) in table.actions"
                                    :key="actionKey"
                                    :to="action.route + '/' + val.departmentId"
                                    :class="action.class"
                                >
                                    <i :class="action.icon" ></i>
                                </router-link>
                            </template>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="pagination">
            <ul class="uk-pagination uk-flex-center" uk-margin>
                
                <li v-for="(link , index) in pagination.links":key="index" :class="{'uk-active':link.active}" @click="renderView(link.label)">
                    <span class="endpoint" v-if="(link.label !=='&laquo; Previous' && link.label !=='Next &raquo;')">{{ link.label }}</span>
                </li>

            </ul>
        </div>
    </div>

</template>

<style scoped>
    .endpoint{
        cursor: pointer;
    }
    .uk-active{
        background-color: #85b8e4ba;
        color: #fff !important;
    }
    .selected-row{
        background-color: #80daa6a3 !important;
    }
</style>