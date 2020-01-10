import  {xPost} from './../utils/xFetch';

export async function getBlobs(values){
    console.log(values);
    const res = await xPost('/blob',values);
    return res;
} 