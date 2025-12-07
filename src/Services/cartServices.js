import apiClient from "../Utils/api-client";

export function addToCartAPI(id,quantity){
   return apiClient.post(`/cart/${id}`,{quantity})
}

export function getCartAPI(){
   return apiClient.get("/cart")
}
export function removeCartAPI(id){
return apiClient.patch(`/cart/remove/${id}`)
}
export function increaseAPI(id){
return apiClient.patch(`/cart/increase/${id}`)
}
export function decreaseAPI(id){
return apiClient.patch(`/cart/decrease/${id}`)
}