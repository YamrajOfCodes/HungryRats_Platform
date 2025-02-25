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

export const deleteproductAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/product/api/deleteproduct/${data}`,{},header,"");
}



// cartAPI


export const addtocartAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/addcart`,data,header,"");
}

export const getcartAPI = async(data,header)=>{
    // console.log(data);
    
    return await commonrequest("GET",`${BASE_URL}/user/api/getcart/${data}`,data,header,"user");
}

export const deletecartAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/api/deletecart/${data}`,{},header,"");
}



// payment and order API

export const checksubscriptionAPI =  async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/user/api/subscription/${data}`,"",header,"");
}

export const getsubscriptionAPI =  async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/subscribe`,data,header,"");
}


export const postorderAPI =  async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/orders/${data.id}`,data,header,"");
}





// messgaeAPI

export const contactAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/api/message`,data,header,"");
}





//Admin API

export const getallCustomersAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallusers`,"",header,"");
}

export const getordersAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getorders`,"",header,"");
}



export const deleteuserAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/admin/api/deleteuser/${data}`,{},header,"");
}

export const deleteorderAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/admin/api/deleteorder/
        
        ${data}`,{},header,"");
}


