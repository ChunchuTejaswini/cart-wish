import React from 'react'
import "./ProductsPage.css"
import Productsidebar from './Productsidebar'
import Productslist from './Productslist'

const ProductsPage = () => {
  return (
   <section className="product_section">
   <Productsidebar/>
   <Productslist/>
   </section>
  )
}

export default ProductsPage