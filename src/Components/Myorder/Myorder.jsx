import React from 'react'
import "./Myorder.css"
import Table from '../Common/Table'
import useData from "../../hooks/useData"
import Loader from "../Common/Loader"

const Myorder = () => {

  const {data:orders ,error,isloading}=useData("/order")


  const getproduct = order => {
    const productarr = order.products.map(p => `${p.product.title}(${p.quantity})`)
    return productarr.join(" ,")
  }

  return (  
    <section className="align_center myorder_page">
      {isloading &&<Loader/> }
      {error && <em className="form_error">{error}</em>}
      

      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{getproduct(order)}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </Table>
      )}
    </section>
  )
}

export default Myorder
