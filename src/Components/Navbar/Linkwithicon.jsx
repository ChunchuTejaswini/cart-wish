import React from 'react'
import "./Linkwithicon.css"
import { NavLink } from 'react-router-dom'

const Linkwithicon = ({title,link,emoji,sidebar}) => {
  return (
    <NavLink to={link} className={sidebar?"align_center sidebar_link":"align_center"}>{title} <img src={emoji} alt="" className="link_emoji" /></NavLink>
  )
}

export default Linkwithicon