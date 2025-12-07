import React from 'react'
import "./Featured.css"
import Productcard from "../Products/Productcard"
import useData from "./../../hooks/useData"
import ProductcardSkel from '../Products/ProductcardSkel'

const Featured = () => {
 const {data,error,isloading} =useData("/products/featured")
 const skeletons=[1,2,3]
  return (
    <section className='featured_products'>
        <h2>Featured products</h2>
 <div className="align_center featured_product_list">
  {error &&<em className='form_error'>{error}</em>}
     {data &&
          data.map((product) => (
            <Productcard
              key={product._id}
              product={product}
            />
          ))}
          {isloading && skeletons.map((n) => <ProductcardSkel key={n} />)}

 </div>
   </section>
  )
}

export default Featured