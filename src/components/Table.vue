<script setup>
    const {table} = defineProps(['table']);
    import Pagination from '@/components/Pagination.vue'
    console.log(table)
</script>

<template>
    <div class="ibox-table">
        <table class="uk-table uk-table-striped set-border">
            <thead>
                <tr class="set-color">
                    <th class="text-transform text-center">Check</th>
                    <th v-for="(val,key) in table.thead":key="key" class="text-transform text-center">{{ val }}</th>
                    <th class="text-transform text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="table.data.length>0">
                    <tr v-for="(val,key) in table.data":key="key">
                        <td class="text-center set-line">
                            <input value="" id="checkAll" type="checkbox" class="input-checkbox" />
                        </td>
                        <td class="text-center set-line">{{ val.name }}</td>
                        <td class="text-center set-line">{{ val.description }}</td>
                        <td class="text-center set-line">
                            <!-- <router-link :to=table.route.show class="btn btn-success"><i class='bx bxs-show'></i></router-link> -->
                            <!-- <router-link :to=table.route.update class="btn btn-warning"><i class='bx bxs-calendar-edit'></i></router-link>
                            <router-link :to=table.route.delete class="btn btn-danger "><i class='bx bxs-trash' ></i></router-link> -->
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
        <Pagination></Pagination>
    </div>

</template>