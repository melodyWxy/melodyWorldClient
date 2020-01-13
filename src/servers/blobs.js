import  {xPost} from './../utils/xFetch';

export async function getBlobs(values){
    console.log(values);
    const res = await xPost('/blob',values);
    return res;
} 

export async function uploadBlobs(values){
    const res = await xPost('/blob/upload',values);
    return res; 
}