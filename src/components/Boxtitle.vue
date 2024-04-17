<script setup>
    const {boxTitle,model} = defineProps(['boxTitle','model']);


</script>
<template>
    <div class="ibox-title">           
        <div class="uk-flex uk-flex-middle uk-flex-between">
            <h3 class="item-heading">{{ boxTitle }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .btn-delete{
        cursor: pointer;
    }
</style>