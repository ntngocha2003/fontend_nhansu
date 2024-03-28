<script setup>
    const {boxFilter} = defineProps(['boxFilter']);
</script>

<template>
    <div class="ibox-filter">
        <form action="" method="">
            <div class="uk-flex form-content">
                <div class="filter-action">
                    <div class="uk-flex">
                        <div class="filter-search">
                            <input
                                type="text"                             
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
</style>