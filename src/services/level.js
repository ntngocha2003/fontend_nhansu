import {ref} from 'vue'
import axios from '@/config/axios'

export default function useLevels(){
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