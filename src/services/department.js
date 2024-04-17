import {ref} from 'vue'
import axios from '@/config/axios'

export default function useDepartments(){
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