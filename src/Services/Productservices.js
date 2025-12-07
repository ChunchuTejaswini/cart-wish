import apiClient from "../Utils/api-client";

export function getsuggestionsAPI(search){
    return apiClient.get(`/products/suggestions?search=${search}`)
}