import React, { useEffect, useState } from "react";
import "./Productslist.css";
import useData from "../../hooks/useData";

import Productcard from "./Productcard";
import ProductcardSkel from "./ProductcardSkel";
import { useSearchParams } from "react-router-dom";

const Productslist = () => {
  const [page, setpage] = useState(1)
  const [search, setsearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery=search.get("search")
  const [sortby,setsortby]=useState("")
  const [sortProducts,setsortProducts]=useState([])
  //const page = search.get("page");

  /*  const [products, setproducts] = useState([])
  const [error, seterror] = useState("")

  useEffect(() => {
  apiClient.get("/products").then(res=>setproducts(res.data.products))
  .catch(err=>seterror(err.message))
  }, []) */

  const { data, error, isloading } = useData(
    "/products",
    {
      params: {
        search:searchQuery,
        category,
        perPage:10,
        page,
      },
    },
    [searchQuery,category, page]
  );
//logic behind search functionality is first set the query stirng in the url and pass the same thing to the API
  useEffect(()=>{
    setpage(1)
  },[searchQuery,category])
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlepagechange = (page) => {
    const currentParams = Object.fromEntries([...search]); //Object.fromEntries() is a built-in JavaScript method that converts an iterable of key–value pairs (like a Map or URLSearchParams) into a plain JavaScript object.

    setsearch({ ...currentParams, page: parseInt(currentParams.page)+1 });}

  useEffect(()=>{
    //console.log("Fetching page:", customConfig?.params?.page);

    const handleScroll=()=>{
     

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
 /* console.log("scrollTop:", scrollTop);
  console.log("clientHeight:", clientHeight);
  console.log("scrollHeight:", scrollHeight); */
     if(scrollTop+clientHeight>=scrollHeight-1 && !isloading && data &&page<data.totalPages){
      console.log("Reached")
      setpage(prev=>prev+1)
     }

    }
    window.addEventListener("scroll" ,handleScroll)

    return()=>{
       window.removeEventListener("scroll" ,handleScroll)
    }
  },[isloading,data,page])
  //scrolltop+clientheight=scrollheight

/*   const handlepagechange = (page) => {
    const currentParams = Object.fromEntries([...search]); //Object.fromEntries() is a built-in JavaScript method that converts an iterable of key–value pairs (like a Map or URLSearchParams) into a plain JavaScript object.

    setsearch({ ...currentParams, page: page });
  }; */

useEffect(()=>{
  if(data&& data.products){
    const products=[...data.products]
    if(sortby==="price desc"){
     setsortProducts( products.sort((a,b) =>b.price-a.price))
    }
    else if(sortby==="price asc"){
   setsortProducts( products.sort((a,b) =>a.price-b.price))
    }
    else if(sortby==="rate asc"){
   setsortProducts( products.sort((a,b) =>a.reviews.rate-b.reviews.rate))
    }
    else if(sortby==="rate desc"){
   setsortProducts( products.sort((a,b) =>b.reviews.rate-a.reviews.rate))
    }
    else{
      setsortProducts(products)
    }

  }
},[sortby,data])
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" className="product_sorting" onChange={e=>setsortby(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">Price high to low</option>
          <option value="price asc">Price low to high</option>
          <option value="rate desc">Rate high to low</option>
          <option value="rate asc">Rate low to high</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        
        {data?.products &&
          sortProducts.map((product) => (
            <Productcard
              key={product._id}
              product={product}
            />
          ))}
          {isloading && skeletons.map((n) => <ProductcardSkel key={n} />)}
      </div>
      {/* {data && (
        <Pagination
          totalposts={data.totalProducts}
          postsperpage={8}
          onClick={handlepagechange}
          currentPage={page}
        />
      )} */}

    </section>
  );
};

export default Productslist;
