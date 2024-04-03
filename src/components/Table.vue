<script setup>
    import {ref,onMounted,onBeforeUnmount, computed} from 'vue'
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
            let currentpage=page
            let dispatchQuery=query || {}
           
            if(!currentpage){
                const queryPage=router.currentRoute.value.query.page
                currentpage=queryPage || 1
            }

            if(!query){
                dispatchQuery ={ ...router.currentRoute.value.query}
                delete dispatchQuery.page
            }

            await store.dispatch('pagination/getData',{page:currentpage, endpoint:endpoint,query:dispatchQuery});

            const hasQueryData= dispatchQuery && Object.keys(dispatchQuery).length !==0;
            const hasPageData=currentpage !==undefined && currentpage !=='';

            if(hasPageData || hasPageData){
                const queryString={};
                if(hasPageData){
                    queryString.page=currentpage
                }
                if(hasQueryData){
                    Object.assign(queryString,dispatchQuery)
                }
                router.push({query:queryString})
                
            }
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

    const deleteMultiple= async()=>{
        bus.off('delete-row'),
        bus.on('delete-row',async data=>{
           const ids=selectedRow.value.map(index=>tableData.value[index].id);
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

    onBeforeUnmount(() => {
        store.dispatch('pagination/clearData');
    }),
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
                                    :to="action.route + '/' + val.id"
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
                    <span class="endpoint" v-if="(link.url !==null)">{{ link.label }}</span>
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
    .uk-table td {
        padding: 10px 12px;
    }
    .uk-table th{
        text-transform: none;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        border-right: 1px solid;
    }
    .set-color{
        background: #90caf9ab;
    }
</style>