import apiClient from "./api-client";

const setAuth=(token)=>{
    if(token){
        apiClient.defaults.headers.common["x-auth-token"]=token}
        else{
     delete  apiClient.defaults.headers.common["x-auth-token"]
        }
       
    }
export default setAuth