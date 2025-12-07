import React, { memo, useContext, useState } from "react";
import "./Singleprod.css";
import Quantity from "./Quantity";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";
import Cartcontext from "../../Contexts/Cartcontext";
import Usercontext from "../../Contexts/Usercontext";

const Singleprod = () => {
  const [selectedImg, setselectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1); // 👈 store quantity here
  const { id } = useParams();
  const { data: product, error, isloading } = useData(`/products/${id}`);
const {addToCart}=useContext(Cartcontext)
const user=useContext(Usercontext)
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isloading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImg === index ? "selected_image" : ""}
                  onClick={() => setselectedImg(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImg]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">₹{product.price.toFixed(2)}</p>

           {user && <><h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <Quantity stock={product.stock} onChange={setQuantity} quantity={quantity} setQuantity={setQuantity} /> {/* 👈 Pass setter */}
            </div>

            <button
              className="search_button add_cart"
              onClick={() => addToCart(product, quantity)} // 👈 pass actual number
            >
              Add to Cart
            </button></>}
          </div>
        </>
      )}
    </section>
  );
};

export default memo(Singleprod);
