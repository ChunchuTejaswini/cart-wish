import React from "react";

import "./Productsidebar.css";
import Linkwithicon from "../Navbar/Linkwithicon";

import useData from "../../hooks/useData";
import config from "../../config.json"

const Productsidebar = () => {
  /* const [categories, setcategories] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    apiClient
      .get("/category")
      .then((res) => setcategories(res.data))
      .catch((err) => seterror(err.message));
  }, []);
 */  //this above code si added into the usedata.js and chanegs are made in that

 const {data:categories,error}=useData("/category")
  return (
    <aside className="product_sidebar">
      <h2>Category</h2>
      <div className="category_links">
         {error&&<em className="form_error">{error}</em>}
         {categories && categories.map(category=> <Linkwithicon
         key={category._id}
          title={category.name}
          link= {`/products?category=${category.name}`}
          emoji={`${config.backendURL}/category/${category.image}`}
          sidebar={true}
        /> )}
       
      </div>
    </aside>
  );
};

export default Productsidebar;
