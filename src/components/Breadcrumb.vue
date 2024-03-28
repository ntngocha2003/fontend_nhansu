<script setup>
    import {ref } from 'vue';
    const {itemTitle} = defineProps(['itemTitle']);
    
</script>

<template>
    <div class="row wrapper border-bottom white-bg page-heading">
    <div class="page-breadcrumb">
        <h2>{{ itemTitle }}</h2>
        <ol class="breadcrumb" style="margin-bottom:10px">
            <li>
                <router-link to="/dashboard" class="router-link">Dashboard / </router-link>
            </li>
            <li class="active"><strong>{{ itemTitle }}</strong></li>
        </ol>
    </div>
</div>
</template>

<style scoped>
    .page-breadcrumb{
        padding: 20px 20px;
        background-color: #fff;
        border-bottom: 1px solid #e7eaec;
    }
    .page-breadcrumb h2{
        font-size: 24px;
    }

    .breadcrumb{
        display: flex;
        list-style: none;
        margin-left: -28px;
    }
    .router-link{
        color: #8ec9f9;
        font-weight: 500;
    }
</style>