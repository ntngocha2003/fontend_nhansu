<script setup>
    import {ref} from 'vue'
    import bus from '@/events/EventBus.js';
    const {boxTitle,model} = defineProps(['boxTitle','model']);

    const deleteMultiple= ()=>{
        bus.emit('delete-row',{})
    }

</script>
<template>
    <div class="ibox-title">           
        <div class="uk-flex uk-flex-middle uk-flex-between">
            <h3 class="item-heading">{{ boxTitle }}</h3>
            <span class="widget-icon">
                <i class="bx bx-cog"></i> 
            </span>
            <div uk-dropdown="mode:click">
                <ul class="uk-list uk-clearfix">
                    <li class="">
                        <div class="uk-flex uk-flex-middle btn-delete" style="margin-bottom: 10px;" @click="deleteMultiple()">
                            <i class="bx bxs-trash-alt"></i>
                            <span>Xóa tùy chọn</span>
                        </div>
                    </li>               
                </ul>               
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn-delete{
        cursor: pointer;
    }
</style>