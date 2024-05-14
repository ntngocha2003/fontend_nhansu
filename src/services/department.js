import {ref} from 'vue'
import axios from '@/config/axios'

export const useDepartments=()=>{
    const departments =ref({})

    const getDepartments=async ()=>{
        try {
            const response=await axios.get('/departmentAll')
            departments.value=response.data.data
           
        } catch (error) {
            console.log(error)
        }
    }

    return { departments, getDepartments}
}

export const fetchPosition=async(id,relation)=>{
    try {
        const response=await axios.get('/positions',{
            params:{
                id:id,
                relation:relation
            }
        })
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}