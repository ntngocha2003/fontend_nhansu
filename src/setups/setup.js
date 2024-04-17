export const setupDataDropbox=(data,root)=>{
    if(Object.keys(data).length===0 && data.constructor===Object){
        return []
    }
    const options=[
        {
            value:0,
            label:root
        },
  
        // console.log(data)
        ...data.map(item=>({
            label:item.name,
            value:item.id
        })),
    ]

    return options;
}