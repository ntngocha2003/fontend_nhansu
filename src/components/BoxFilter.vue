<script setup>
    import {ref} from 'vue'
    const {boxFilter} = defineProps(['boxFilter']);
    import {useStore} from 'vuex'
    const store=useStore();
    import bus from '@/events/EventBus.js';
    

    const perpage=ref(10);
    const keyword=ref('');

    const search=()=>{
        bus.emit('searchTable',{
            perpage:perpage.value,
            keyword:keyword.value
        })
    }
</script>

<template>
    <div class="ibox-filter">
        <form action="" method=""@submit.prevent="search()">
            <div class="uk-flex uk-flex-middle uk-flex-between from-container">
                <select class="select-page uk-select uk-textarea" v-model="perpage">
                    <option value="10">10 bản ghi</option>
                    <option value="5">5 bản ghi</option>
                    <option value="1">1 bản ghi</option>
                </select>
                <div class="filter-action">
                    <div class="uk-flex">
                        <div class="filter-search">
                            <input
                                type="text"
                                v-model="keyword"                             
                                class="form-control uk-input input-search"
                                placeholder="Nhập từ khóa cần tìm kiếm"
                            />                    
                            <button class="uk-button-primary btn-search"><i class="bx bx-search"></i></button>
                        </div>
                        <router-link :to=boxFilter.createLink class="link-add"><i class="bx bx-plus"></i>{{ boxFilter.createText }}</router-link>
                    </div>
                </div>
            </div>
        </form>               
    </div>
</template>

<style scoped>

    .input-search{
        height: 35px;
        border-radius: 5px;
    }
    .from-container{
        margin: 0 20px 20px 20px;
    }
    .select-page{
        border-radius: 5px;
        width: 20%;
        padding: 6px 10px;
        background: #fff;
        color: #666;
        border: 1px solid #e5e5e5;
        transition: .2s ease-in-out;
        transition-property: color, background-color, border;
    }
    .btn-search{
        cursor: pointer;
    }
</style>