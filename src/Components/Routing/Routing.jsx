import React, { useContext } from 'react'

import {Routes,Route} from "react-router-dom"
import Homepage from '../Home/Homepage'
import ProductsPage from '../Products/ProductsPage'
import Singleprod from '../Singleprod/Singleprod'
import Cartpage from '../Cart/Cartpage'
import Myorder from '../Myorder/Myorder'
import Loginpage from '../Authentication/Loginpage'
import Signup from '../Authentication/Signup'
import Logout from '../Authentication/Logout'
import Cartcontext from '../../Contexts/Cartcontext'
import Protected from './Protected'

const Routing=() => {
 
 
  return (
    <Routes>

    <Route path="/" element={<Homepage/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="/product/:id" element={<Singleprod /> }/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Loginpage/>}/>
    <Route element={<Protected/>}>
    <Route path="/cart" element={<Cartpage  />}  />
    <Route path="/myorders" element={<Myorder/>}/>
    <Route path="/logout" element={<Logout/>}/>
    </Route>



    </Routes>
  )
}

export default Routing