export  async function xGet(...props){
    const result = await fetch(...props)
        .then(res=>res.json())
        .catch(console.error)
    return result;
}
export async function xPost(url,body){
    const result = await fetch(url,{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(body)
        })
        .then(res=>res.json())
        .catch(console.error)
    return result;
}