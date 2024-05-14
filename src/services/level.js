import {ref} from 'vue'
import axios from '@/config/axios'

export const useLevels=()=>{
    const levels =ref({})

    const getLevels=async ()=>{
        try {
            const response=await axios.get('/levelAll')
            levels.value=response.data.data
           
        } catch (error) {
            console.log(error)
        }
    }

    return { levels, getLevels}
}
export const fetchSpecialized=async(id,relation)=>{
    try {
        const response=await axios.get('/specializeds',{
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