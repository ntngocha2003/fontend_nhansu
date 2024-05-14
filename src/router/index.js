import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '@/middleware/auth.js'
import loginMiddleware from '@/middleware/login.js'
// import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Layout from '@/components/Layout.vue'
import Dashboard from '@/views/Dashboard.vue'

import DepartmentIndex from '@/views/Department/DepartmentIndex.vue'
import DepartmentStore from '@/views/Department/DepartmentStore.vue'
import DepartmentDelete from '@/views/Department/DepartmentDelete.vue'

import PositionIndex from '@/views/Position/PositionIndex.vue'
import PositionStore from '@/views/Position/PositionStore.vue'
import PositionDelete from '@/views/Position/PositionDelete.vue'

import LevelIndex from '@/views/Level/LevelIndex.vue'
import LevelStore from '@/views/Level/LevelStore.vue'
import LevelDelete from '@/views/Level/LevelDelete.vue'

import SpecializedIndex from '@/views/Specialized/SpecializedIndex.vue'
import SpecializedStore from '@/views/Specialized/SpecializedStore.vue'
import SpecializedDelete from '@/views/Specialized/SpecializedDelete.vue'

import SalaryIndex from '@/views/Salary/SalaryIndex.vue'
import SalaryStore from '@/views/Salary/SalaryStore.vue'
import SalaryDelete from '@/views/Salary/SalaryDelete.vue'

import EmployeeDelete from '@/views/Employee/EmployeeDelete.vue'
import EmployeeIndex from '@/views/Employee/EmployeeIndex.vue'
import EmployeeStore from '@/views/Employee/EmployeeStore.vue'
import Detail from '@/views/Employee/Detail.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [  
    { path: '/admin',name: 'adminLogin',component: Login, meta:{middleware: [loginMiddleware]}},
    {path: '/dashboard',name: 'dashboard.index',component: Dashboard, meta: {middleware:[authMiddleware]}},

    // Department

    {path: '/department/index',name: 'department.index',component: DepartmentIndex,meta: {middleware:[authMiddleware]}},
    {path: '/department/create',name: 'department.create',component: DepartmentStore,meta: {middleware:[authMiddleware]}},
    {path: '/department/update/:id',name: 'department.update',component: DepartmentStore,meta: {middleware:[authMiddleware]}},
    {path: '/department/delete/:id',name: 'department.delete',component: DepartmentDelete,meta: {middleware:[authMiddleware]}},

    // Position
    
    {path: '/position/index',name: 'position.index',component: PositionIndex,meta: {middleware:[authMiddleware]}},
    {path: '/position/create',name: 'position.create',component: PositionStore,meta: {middleware:[authMiddleware]}},
    {path: '/position/update/:id',name: 'position.update',component: PositionStore,meta: {middleware:[authMiddleware]}},
    {path: '/position/delete/:id',name: 'position.delete',component: PositionDelete,meta: {middleware:[authMiddleware]}},

    // Level

    {path: '/level/index',name: 'level.index',component: LevelIndex,meta: {middleware:[authMiddleware]}},
    {path: '/level/create',name: 'level.create',component: LevelStore,meta: {middleware:[authMiddleware]}},
    {path: '/level/update/:id',name: 'level.update',component: LevelStore,meta: {middleware:[authMiddleware]}},
    {path: '/level/delete/:id',name: 'level.delete',component: LevelDelete,meta: {middleware:[authMiddleware]}},

    // Specialized

    {path: '/specialized/index',name: 'specialized.index',component: SpecializedIndex,meta: {middleware:[authMiddleware]}},
    {path: '/specialized/create',name: 'specialized.create',component: SpecializedStore,meta: {middleware:[authMiddleware]}},
    {path: '/specialized/update/:id',name: 'specialized.update',component: SpecializedStore,meta: {middleware:[authMiddleware]}},
    {path: '/specialized/delete/:id',name: 'specialized.delete',component: SpecializedDelete,meta: {middleware:[authMiddleware]}},

    // Salary

    {path: '/salary/index',name: 'salary.index',component: SalaryIndex,meta: {middleware:[authMiddleware]}},
    {path: '/salary/create',name: 'salary.create',component: SalaryStore,meta: {middleware:[authMiddleware]}},
    {path: '/salary/update/:id',name: 'salary.update',component: SalaryStore,meta: {middleware:[authMiddleware]}},
    {path: '/salary/delete/:id',name: 'salary.delete',component: SalaryDelete,meta: {middleware:[authMiddleware]}},

    // Employee

    {path: '/employee/index',name: 'employee.index',component: EmployeeIndex,meta: {middleware:[authMiddleware]}},
    {path: '/employee/create',name: 'employee.create',component: EmployeeStore,meta: {middleware:[authMiddleware]}},
    {path: '/employee/update/:id',name: 'employee.update',component: EmployeeStore,meta: {middleware:[authMiddleware]}},
    {path: '/employee/delete/:id',name: 'employee.delete',component: EmployeeDelete,meta: {middleware:[authMiddleware]}},
    {path: '/employee/detail/:id',name: 'employee.detail',component: Detail,meta: {middleware:[authMiddleware]}}
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
