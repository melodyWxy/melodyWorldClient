import {xPost} from './../utils/xFetch';

export async function loginGlobal (values){
    const res = await xPost('/login',values);
    return res;
}