import React, { useEffect, useState } from 'react'
import apiClient from '../Utils/api-client';

const useData = (endpoint,customConfig,deps) => {
   const [data, setdata] = useState(null); //we are passing null bcz we dont use theat data to only store array but also the objects
  const [error, seterror] = useState("");
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    setisloading(true)
    apiClient
      .get(endpoint,customConfig)
      .then((res) => {
        if(endpoint==="/products" && data && data.products &&customConfig.params.page!==1){
          setdata(prev=>({
            ...prev,products:[...prev.products,...res.data.products]
          }))
        }else{
        setdata(res.data)
        }

        setisloading(false)
      })
      .catch((err) => {seterror(err.message);
      setisloading(false)})

    
  }, deps?deps:[]);
return {data,error,isloading};
}

export default useData