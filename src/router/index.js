import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '@/middleware/auth.js'
import loginMiddleware from '@/middleware/login.js'
// import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Layout from '@/components/Layout.vue'
import Dashboard from '@/views/Dashboard.vue'
import DepartmentIndex from '@/views/Department/DepartmentIndex.vue'
import DepartmentStore from '@/views/Department/DepartmentStore.vue'
// import DepartmentUpdate from '@/views/Department/DepartmentUpdate.vue'
// import DepartmentDelete from '@/views/Department/DepartmentDelete.vue'
// import EmployeeDelete from '@/views/Employee/EmployeeDelete.vue'
// import EmployeeIndex from '@/views/Employee/EmployeeIndex.vue'
// import EmployeeStore from '@/views/Employee/EmployeeStore.vue'
// import EmployeeUpdate from '@/views/Employee/EmployeeUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [  
    { path: '/admin',name: 'adminLogin',component: Login, meta:{middleware: [loginMiddleware]}},
    {path: '/dashboard',name: 'dashboard.index',component: Dashboard, meta: {middleware:[authMiddleware]}},

    // Department

    {path: '/department/index',name: 'department.index',component: DepartmentIndex,meta: {middleware:[authMiddleware]}},
    {path: '/department/store',name: 'department.store',component: DepartmentStore,meta: {middleware:[authMiddleware]}},
    // {path: '/department/update',name: 'department.update',component: DepartmentUpdate},
    // {path: '/department/delete',name: 'department.delete',component: DepartmentDelete},


    // {path: '/employee/index',name: '/employee.index',component: EmployeeIndex},

    // {
    //   path: '/employee/store',name: '/employee.store',component: EmployeeStore
    // },

    // {
    //   path: '/employee/update',name: '/employee.update',component: EmployeeUpdate
    // },

    // {
    //   path: '/employee/delete',name: '/employee.delete',component: EmployeeDelete
    // }
  ]
})



router.beforeEach((to,from,next)=>{
  if(to.meta.middleware){
    const middleware=to.meta.middleware
    middleware.forEach(m => m(to,from, next))
  }
  else{
    next();
  }
})

export default router
