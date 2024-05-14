export const setupDataDropboxSalary=(data,root)=>{
    if(Object.keys(data).length===0 && data.constructor===Object){
        return []
    }
    const options=[
        {
            value:0,
            label:root
        },
  
      
        ...data.map(item=>({
            label:item.salaryStep,
            value:item.id
        })),
    ]

    return options;
}