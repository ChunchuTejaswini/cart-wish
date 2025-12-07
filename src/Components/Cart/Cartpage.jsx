import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import "./Cartpage.css"

import Table from '../Common/Table'
import Quantity from "../Singleprod/Quantity"
import deleteicon from "../../assets/delete.png"
import Usercontext from '../../Contexts/Usercontext'
import Cartcontext from '../../Contexts/Cartcontext'
import { checkoutAPI } from '../../Services/oderservices'
import { toast,ToastContainer } from 'react-toastify'

const Cartpage = () => {
   
   const userobj= useContext(Usercontext)

const {cart,removeCart,updatecart,setcart}=useContext(Cartcontext)

//prop drilling -it is just for using in child component we are drilling other parent components. so there is another way to pass the data
//that is usecontext whihc is used to manage global  data in react applciation like theme,user,cart details etc.
//insimple words by using usecontext hook we can make our data globally access by any component.

//The useContext hook in React is used to share data between components without passing props manually through every level of the component tree.
const Subtotal=useMemo(()=>{
    let total=0;
    cart.forEach(item => {
        total+=item.product.price *item.quantity
        
    });
    return total
},[cart])

const checkout=()=>{
    const oldcart=[...cart]
    setcart([])
    checkoutAPI().then(()=>{
        toast.success("order placed successfully")
    }).catch(()=>{
        toast.error("somehtin went wrong")
        setcart(oldcart)
    })
}

  return (
    <section className='align_center cart_page'>
        <div className="align_center user_info">
            <img src={`http://localhost:5000/profile/${userobj?.profilePic}`} alt="user profile"/>
            <div>
               <p className="user_name">Name: {userobj?.name}</p>
               <p className="user_email">Email: {userobj?.email}</p>
            </div>
        </div>

         <Table headings={["Item","Price","Quantity","Total","Remove"]}>
  
          {cart.map(({product,quantity})=>
          <tr  key={product._id}>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td className='align_center table_quantity_input'><Quantity  quantity={quantity} stock={product.stock}  setQuantity={updatecart} cartPage={true} productId={product._id}/></td>
                    <td>${quantity *product.price}</td>
                    <td><img onClick={()=>removeCart(product._id)} src={deleteicon} alt="delete icon" className='cart_remove_icon'/></td>
                </tr>)}      
     
         </Table>
        

   <table className="cart_bill">
    <tbody>
        <tr>
            <td>Subtotal</td>
            <td>{Subtotal}</td>
        </tr>
        <tr>
            <td>Shipping charge</td>
            <td>$5</td>
        </tr>
        <tr className='cart_bill_final'>
            <td>Finaltotal</td>
            <td>${Subtotal+5}</td>
        </tr>
    </tbody>
   </table>
   <button className="search_button checkout_button"  onClick={checkout}>Checkout</button>

    </section>
  )
}

export default memo(Cartpage)

//const total=usememo(()=>{ex(count)},[count])
//