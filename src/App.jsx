/* import React, { useCallback, useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import Usercontext from "./Contexts/Usercontext";
import Cartcontext from "./Contexts/Cartcontext";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { getJwt, getUser } from "./Services/userServices";
import setAuth from "./Utils/setAuth";
import {
  addToCartAPI,
  decreaseAPI,
  getCartAPI,
  increaseAPI,
  removeCartAPI,
} from "./Services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import { array } from "zod";
import cartReducer from "./reducers/cartReducer";
setAuth(getJwt());

const App = () => {
  const [user, setuser] = useState(null);
  const [cart,dispatchcart]=useReducer(cartReducer,[])

  useEffect(() => {
    try {
      const jwtuser = getUser();
      if (Date.now() >= jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setuser(jwtuser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback((product, quantity) => {
   dispatchcart({type:"Add_to_cart",payload:{product:product ,quantity:quantity}})
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("product added successfully");
        /*  toast.error("product added successfully")
    toast.warning("product added successfully")
    toast.info("product added successfully")
    toast("product added successfully") */
     /*  })
      .catch((err) => {
        toast.error("failed to add the product");
        dispatchcart({type:"Revert_cart",payload:{cart}})
      });
  },[cart]);

  const removeCart =useCallback( (id) => {
  dispatchcart({type:"Remove_cart" ,payload:{id}})
    removeCartAPI(id).catch((err) => {
      toast.error("something went wrong");
        dispatchcart({type:"Revert_cart",payload:{cart}})
    });
  },[cart]
)
  const updatecart =useCallback( (type, id) => {
   
    const updatedcart = [...cart];
    const productindex = updatedcart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedcart[productindex].quantity += 1;
       dispatchcart({type:"Get_cart",payload:{products:updatedcart}})


      increaseAPI(id).catch((err) => {
        toast.error("something went wrong");
         dispatchcart({type:"Revert_cart",payload:{cart}})
      });
    }

    if (type === "decrease") {
      updatedcart[productindex].quantity -= 1;
      dispatchcart({type:"Get_cart",payload:{products:updatedcart}})

      decreaseAPI(id).catch((err) => {
        toast.error("something went wrong");
          dispatchcart({type:"Revert_cart",payload:{cart}})
      });
    }
  },[cart])

  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
      dispatchcart({type:"Get_cart",payload:{product:res.data}})
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  },[user])

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <Usercontext.Provider value={user}>
      <Cartcontext.Provider
        value={{ cart, addToCart, removeCart, updatecart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </Cartcontext.Provider>
    </Usercontext.Provider>
  );
};

export default App;
 */
 



import React, { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import Usercontext from "./Contexts/Usercontext";
import Cartcontext from "./Contexts/Cartcontext";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { getJwt, getUser } from "./Services/userServices";
import setAuth from "./Utils/setAuth";
import {
  addToCartAPI,
  decreaseAPI,
  getCartAPI,
  increaseAPI,
  removeCartAPI,
} from "./Services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import { array } from "zod";
setAuth(getJwt());

const App = () => {
  const [user, setuser] = useState(null);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    try {
      const jwtuser = getUser();
      if (Date.now() >= jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setuser(jwtuser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback((product, quantity) => {
    const updatedcart = [...cart];
    const prodIndex = updatedcart.findIndex(
      (item) => item.product._id === product._id
    );

    if (prodIndex === -1) {
      updatedcart.push({ product: product, quantity: quantity });
    } else {
      updatedcart[prodIndex].quantity += quantity;
    }
    setcart(updatedcart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("product added successfully"); 
        /*  toast.error("product added successfully")
    toast.warning("product added successfully")
    toast.info("product added successfully")
    toast("product added successfully") */
       })
      .catch((err) => {
        toast.error("failed to add the product");
        setcart(cart);
      });
  },[cart]);

  const removeCart =useCallback( (id) => {
    const oldcart = [...cart];
    const newcart = oldcart.filter((item) => item.product._id !== id);
    setcart(newcart);

    removeCartAPI(id).catch((err) => {
      toast.error("something went wrong");
      setcart(oldcart);
    });
  },[cart]
)
  const updatecart =useCallback( (type, id) => {
    const oldcart = [...cart];
    const updatedcart = [...cart];
    const productindex = updatedcart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedcart[productindex].quantity += 1;
      setcart(updatedcart);
      increaseAPI(id).catch((err) => {
        toast.error("something went wrong");
        setcart(oldcart);
      });
    }

    if (type === "decrease") {
      updatedcart[productindex].quantity -= 1;
      setcart(updatedcart);

      decreaseAPI(id).catch((err) => {
        toast.error("something went wrong");
        setcart(oldcart);
      });
    }
  },[cart])

  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        setcart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  },[user])

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <Usercontext.Provider value={user}>
      <Cartcontext.Provider
        value={{ cart, addToCart, removeCart, updatecart, setcart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </Cartcontext.Provider>
    </Usercontext.Provider>
  );
};

export default App;


 