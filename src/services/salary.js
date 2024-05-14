import {ref} from 'vue'
import axios from '@/config/axios'

export default function useSalarys(){
    const salarys =ref({})

    const getSalarys=async ()=>{
        try {
            const response=await axios.get('/SalaryAll')
            salarys.value=response.data.data
           
        } catch (error) {
            console.log(error)
        }
    }

    return { salarys, getSalarys}
}