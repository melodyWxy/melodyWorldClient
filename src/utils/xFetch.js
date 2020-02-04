const hostname = "http://120.27.61.111:8806";
// const hostname = "http://localhost:8806";
export  async function xGet(url){
    const result = await fetch(hostname+url)
        .then(res=>res.json())
        .catch(console.error)
    return result;
}
export async function xPost(url,body){
    const result = await fetch(hostname+url,{
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