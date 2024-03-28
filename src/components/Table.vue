<script setup>
    import {ref,onMounted, computed} from 'vue'
    import {useStore} from 'vuex'
    const store=useStore();
    import { useRouter } from 'vue-router';
 
    const router=useRouter();
    const {table,endpoint} = defineProps(['table','endpoint']);

    const tableData=computed(()=>{
        return store.getters['pagination/getData']      
    })

    const pagination=computed(()=>{
        return store.getters['pagination/getPagination']      
    })

    const renderView=async (page) => {
        try {
            page =(typeof page !=='undefined') ? page :'';
            await store.dispatch('pagination/getData',{page:page, endpoint:endpoint});

            router.push({query:{page:page || '1'}})

        } catch (error) {
            console.log(error)
        }
    }
    onMounted(() => {
      renderView()
    })

</script>

<template>
    <div class="ibox-table">
        <table class="uk-table uk-table-striped set-border">
            <thead>
                <tr class="set-color">
                    <th class="text-transform text-center">Check</th>
                    <th v-for="(val,key) in table.content.name":key="key" class="text-transform text-center">{{ val }}</th>
                    <th class="text-transform text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="tableData!==null">
                    <tr v-for="(val,key) in tableData":key="key">
                        <td class="text-center set-line">
                            <input value="" id="checkAll" type="checkbox" class="input-checkbox" />
                        </td>
                        <td v-for="(content,index) in table.content.value":key="index" class="text-center set-line">{{ val[content] }}</td>
                        <td class="text-center set-line">
                            <template v-if="table.actions.length>0">
                                <router-link 
                                    v-for="(action, actionKey) in table.actions"
                                    :key="actionKey"
                                    :to="action.route"
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
                    <span class="endpoint" v-if="link.label !=='&laquo; Previous' && link.label !=='Next &raquo;'">{{ link.label }}</span>
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
</style>