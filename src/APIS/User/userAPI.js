import { commonrequest } from "../commonrequest"
import { BASE_URL } from "../helper"


export const userRegisterAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/register`,data,header,"");
}

export const userLoginAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/login`,data,header,"");
}

export const userverifyAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/user/api/userverify`,data,header,"user");
}


export const userLogoutAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/logout`,{},header,"user")
}

export const addproductAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/addproduct`,data,header,"");
}


export const getallproductsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getallproducts`,"",header,"");
}