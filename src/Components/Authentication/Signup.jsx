import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "./Signup.css";
import user from "../../assets/user-male-circle.png";
import { signup } from "../../Services/userServices";


const schema = z.object({
  
  name: z.string().min(4, { message: "Enter the name" }),
  email: z.string().email({ message: "Enter the mail" }).min(3),
  password: z.string().min(8, { message: "Enter the valid password" }),
  confirmpassword: z.string(),
  deliveryaddress: z.string().min(10, { message: "Enter the address" }),
}).refine(data=>data.password===data.confirmpassword,{message:"confirm pass does not match pass",path:["confirmpassword"]});



const Signup = () => {

  const [profilePic, setprofilePic] = useState(null)
  const [formData, setformData] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(fomdata) => {
    console.log("Form submitted:", fomdata);
    try{
   await signup(fomdata,profilePic);
    
    window.location="/"
  }
  catch(err){
if(err.response && err.response.status === 400)
  setformData(err.response.data.message)

  }

  }
  if(getUser()){
  return <Navigate to="/"/>}
  return (
    <section className="signup_page align_center">
      <form onSubmit={handleSubmit(onSubmit)} className="signup_form">
        <h2>Sign Up</h2>
        <div className="image_input_section">
          <div className="image_preview">
            <img src={profilePic?URL.createObjectURL(profilePic):user} id="file-ip-1-preview"/>
            {/* src={pp?pp:user}  so when we use this condititonal statement ternary thing when we click on upload image in the UI just a object is reflected but not th exact image so now we should chnage object into the image 
            so we have a createObjectURL thing to complete this job ,
            URL.createObjectURL() is a method in js that allows us to create a unique URL for a given file
            This partilcuar URL is used to display image in the image tag or playing audio or video file in media player
            This is just a temporary URL which means if we close our page then it will go away*/}
          </div>
          <label htmlFor="file-ip-1" className="image_label">Upload Image</label>
          <input type="file" id="file-ip-1" onChange={(e)=>setprofilePic(e.target.files[0])} className="image_input"/>
        </div>

        <div className="input_row">
          <div className="input_field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && <em>{errors.name.message}</em>}
          </div>

          <div className="input_field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <em>{errors.email.message}</em>}
          </div>
        </div>

        <div className="input_row">
          <div className="input_field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <em>{errors.password.message}</em>}
          </div>

          <div className="input_field">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              placeholder="Confirm password"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <em>{errors.confirmpassword.message}</em>
            )}
          </div>
        </div>

        <div className="input_field full_width">
          <label htmlFor="deliveryaddress">Delivery Address</label>
          <textarea
            id="deliveryaddress"
            placeholder="Enter your full delivery address"
            {...register("deliveryaddress")}
          ></textarea>
          {errors.deliveryaddress && <em>{errors.deliveryaddress.message}</em>}
        </div>
{formData && <em className="form_error">{formData}</em>}
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Signup;


//The backened is connected to frontened by using express.js nodejs and also mogodb
