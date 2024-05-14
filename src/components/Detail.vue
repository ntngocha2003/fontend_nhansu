<script setup>
    import axios from '@/config/axios'
    import {ref} from 'vue'
    const {formData} = defineProps(['formData']);

    const Data=ref({
    department: '',
    position:'',
    level :'',
    specialized:'',
    totalSalary:'',
    salaryStep:'',
    basicSalary:'',
    coefficientsSalary:'',
    allowanceCoefficient:''
  })

    const getDepartments= async()=>{
        
        try {
            const response=await axios.get('/department/' +formData.departmentId)
            Data.value.department=response.data.data.name
            
        } catch (error) {
            console.log(error)
        }            
    }
    
    const getPositions= async()=>{
        
        try {
            const response=await axios.get('/position/' +formData.positionId)
            Data.value.position=response.data.data.name
            
        } catch (error) {
            console.log(error)
        }            
    }

    
    const getLevels= async()=>{
        
        try {
            const response=await axios.get('/level/' +formData.levelId)
            Data.value.level=response.data.data.name
            
        } catch (error) {
            console.log(error)
        }            
    }

    const getSpecializeds= async()=>{
        
        try {
            const response=await axios.get('/specialized/' +formData.specializedId)
            Data.value.specialized=response.data.data.name
            
        } catch (error) {
            console.log(error)
        }            
    }

    const getSalarys= async()=>{
        
        try {
            const response=await axios.get('/salary/' +formData.salaryId)
            Data.value.salaryStep=response.data.data.salaryStep
            Data.value.basicSalary=response.data.data.basicSalary
            Data.value.coefficientsSalary=response.data.data.coefficientsSalary
            Data.value.allowanceCoefficient=response.data.data.allowanceCoefficient
           
        } catch (error) {
            console.log(error)
        }            
    }
getPositions()
getDepartments()
getLevels()
getSpecializeds()
getSalarys()
</script>


<template>
    <div>
        <p>Tên nhân viên : {{ formData.name }}</p>
        <p>Email: {{ formData.email }}</p>
        <p>Số điện thoại: {{ formData.phone }}</p>
        <p>Tuổi: {{ formData.age }} </p>
        <p>Địa chỉ: {{ formData.address }} </p>
        <p>CCCD: {{ formData.identification }} </p>
        <p>Phòng ban: {{ Data.department }}</p>
        <p>Chức vụ: {{ Data.position }}</p>
        <p>Trình độ: {{ Data.level }}</p>
        <p>Chuyên ngành: {{ Data.specialized }}</p>
        <p>Tổng lương: {{Data.basicSalary * Data.allowanceCoefficient * Data.coefficientsSalary }}</p>
        
    </div>

</template>
