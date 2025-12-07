import React from 'react'
import Herosection from './Herosection'
import iphone from "../../assets/My-iphone.png";
import mac from "../../assets/mac-os.png"
import Featured from './Featured';


const Homepage = () => {
  return (
    <div><Herosection title="Buy Iphone 14pro" subtitle="Experience the power of the latest iphone 14 with our most pro camera ever" link="/product/69354b8f1c2fe990e4ff5675"  image={iphone}/>
    <Featured/>
    <Herosection title="Buy Iphone Ultimate setup" subtitle="You can add studio display and colour-matched magic accessories tp yppur bag after conffigure your mac mini" link="/product/69354b8f1c2fe990e4ff5681"  image={mac}/></div>
  )
}

export default Homepage