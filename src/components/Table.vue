<script setup>
    import {ref,onMounted,onBeforeUnmount, computed} from 'vue'
    import {useStore} from 'vuex'
    const store=useStore();
    import { useRouter } from 'vue-router';
    import bus from '@/events/EventBus.js';
    const router=useRouter();
    const {table,endpoint,model,tasks} = defineProps(['table','endpoint','model','tasks']);
    const tableData=computed(()=>{
        return store.getters['pagination/getData']      
    })

    const pagination=computed(()=>{
        return store.getters['pagination/getPagination']      
    })

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

    onBeforeUnmount(() => {
        store.dispatch('pagination/clearData');
        // location.reload();
    }),
    
    onMounted(() => {
      renderView();
      emitSearch();
    })

</script>

<template>
    <div class="ibox-table">
        <table class="uk-table uk-table-striped set-border">
            <thead>
                <tr class="set-color">
                    <th v-for="(val,key) in table.content.name":key="key" class="text-transform text-center">{{ val }}</th>
                    <th class="text-transform text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="tableData!==null">
                    <tr v-for="(val,key) in tableData":key="key">
                       
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