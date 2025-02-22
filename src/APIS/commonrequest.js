import axios from "axios";

export const commonrequest = async(methods,url,body,header,auth)=>{
    const userToken = localStorage.getItem("login");
    // console.log(userToken);
    // console.log(auth);
    
    
   
    const config ={
        method:methods,
        url,
        headers:{},
        data:body
    }


    

    if(auth == "admin"){
        config.headers.Authorization = "dsdsd"
    }else if(auth == "user"){
        config.headers.Authorization = userToken;
        // console.log(userToken);
        
    }


    if(header){
        config.headers["Content-Type"] = "multipart/form-data"
    }else{
        config.headers["Content-Type"] = "application/json"
    }

    try {
        const response = await axios(config)
        // console.log(response);
        
        return response;
    } catch (error) {
        return error
    }
}