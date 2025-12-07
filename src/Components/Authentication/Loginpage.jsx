import React, { useRef, useState } from "react";
import "./Loginpage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../Services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 min characters" }),
});
//first using z method we created our validated schema which is a set of rules for form fills,and then using zod resolver we directly add our scheme into react hook form

//👉 schema is a validation blueprint created using Zod to define what your form data should look like and what rules it must follow.
const Loginpage = () => {
  const [formError, setformError] = useState("");
   const location=useLocation()
  /* const nameref = useRef(null);
    const phref=useRef(null)
    const user={
        name:"",
        ph:0
    } */

  /*   const [formData, setformData] = useState({
        Name:"",
        ph:""
      })
      const handlechange=(e)=>{
 const {name,value}=e.target
        setformData((prev)=>({
            ...prev,
            [name]:value

              /* [name]: name === "ph" ? parseInt(value, 10) || "" : value   this is what we use if we wantph in terms of parseint
        }))
      } */
  /* const handlesubmit=(e)=>{
        e.preventDefault()

       
        } */

  /* user.name=(nameref.current.value)
    user.ph(phref.current.value) */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (fomdata) => {
     console.log("Form validated successfully, calling onSubmit", fomdata);
    try {
      await login(fomdata);
      //console.log("Login success:", response);

      //console.log("Navigating now...");
      const {state}=location
      window.location =state?state.from: "/";

    } catch (err) {
      if (err.response && err.response.status === 400)
        setformError(err.response.data.message);
    }
  };
if(getUser()){
  return <Navigate to="/"/>}
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            {/* <label htmlFor="name">Name</label> */}
            {/* <input type="text" name="Name"  value={formData.Name }  {...register("Name",{required:true,minLength:3})}  ref={nameref}  id="name"className="form_text_input" placeholder='enter the name' /* onChange={handlechange} />
/* {errors.name?.type==="required"&&<em className="form_error">Please enter your name</em>} */
            /* {errors.name?.type==="minlength"&&<em className="form_error">PLease enter min length</em>} */}
            {/* //optional query */}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              /* value={formData.Name } */ {...register("email")}
              /* ref={nameref} */ id="email"
              className="form_text_input"
              placeholder="enter the email" /* onChange={handlechange} */
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
            {/* {errors.name?.type==="minlength"&&<em className="form_error">PLease enter min length</em>} */}
            {/* //optional query */}
          </div>
          <div>
            {/* <label htmlFor="phone">Phone no</label>
                 <input type="number"  ref={phref}  name="ph" {...register("ph",{valueAsNumber:true})} value={formData.ph} id="phone" className="form_text_input" placeholder='enter the no' onChange={handlechange} />
 */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              /* value={formData.Name } */ {...register("password")}
              /* ref={nameref} */ id="password"
              className="form_text_input"
              placeholder="enter the pass" /* onChange={handlechange} */
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}

            {/*  <button type="button" onClick={()=>passwordref.current.type="password"}>Hidepassword</button>
                <button type="button" onClick={()=>passwordref.current.type="text"}>Showpassword</button> */}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Loginpage;

