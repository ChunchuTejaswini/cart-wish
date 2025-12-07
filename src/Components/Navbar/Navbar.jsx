import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/star-glowing.png";
import id from "../../assets/id-verified.png";
import memo from "../../assets/note.png";
import packaged from "../../assets/package.png";
import lock from "../../assets/lock.png";
import Linkwithicon from "./Linkwithicon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Usercontext from "../../Contexts/Usercontext";
import Cartcontext from "../../Contexts/Cartcontext";
import { getsuggestionsAPI } from "../../Services/Productservices";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [selecteditem,setselecteditem]=useState(-1)

  const user = useContext(Usercontext);
  const { cart } = useContext(Cartcontext);
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      //basicLLY trim is used to reduce unwanted spaces between the words
      navigate(`/products?search=${search.trim()}`);
    }
    setsuggestions([]);
  };
  useEffect(() => {
   const delaysuggestions= setTimeout(() => {
      if (search.trim() !== "") {
      getsuggestionsAPI(search)
        .then((res) => setsuggestions(res.data))
        .catch((err) => console.log(err));
    } else {
      setsuggestions([]);
    }
     }, 300);
     return ()=>clearTimeout(delaysuggestions)
  }, [search]);


    
  /* useEffect(() => {
  const fetchSuggestions = async () => {
    try {
      const res = await getsuggestionsAPI(search);
      setsuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (search.trim() !== "") {
    fetchSuggestions();
  }
}, [search]);
 */
const handlekeydown=(e)=>{
  if(selecteditem<suggestions.length){
if(e.key==="ArrowDown"){
    setselecteditem(current=>current===suggestions.length-1?0:current+1)
  }
  else if(e.key==="ArrowUp"){
    setselecteditem(current=>current===0?suggestions.length-1:current-1)
  }
  else if(e.key==="Enter" && selecteditem>-1){
    const suggestion=suggestions[selecteditem]
    navigate(`/products?search=${suggestion.title}`)
    setsearch("")
    setsuggestions([])
  }
  }
  else{
    setsuggestions(-1)
  }
  
}
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className=" navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handlesubmit}>
          <input
            type="text"
            className="navbar_search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="search products"
            onKeyDown={handlekeydown}
          />
          <button type="submit" className="search_button">
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion,index) => (
                <li className={selecteditem===index?"search_suggestion_link active":"search_suggestion_link"} key={suggestion._id}>
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setsearch("");
                      setsuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className=" align_center navbar_links">
        <Linkwithicon title="Home" link="/" emoji={rocket} />
        <Linkwithicon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <Linkwithicon title="Login" link="/login" emoji={id} />
            <Linkwithicon title="Signup" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            {" "}
            <Linkwithicon title="My orders" link="/myorders" emoji={packaged} />
            <Linkwithicon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


//Debouncing -for wxample if u enter anythong inside search bar for evry letter the api is getting called so this is not correct beacosue application slows down
//so there will be load on the server that is not crt so we us ethis debounicng whihc is a method to delay the execution of a function until after a cretain amoutn of time has passed