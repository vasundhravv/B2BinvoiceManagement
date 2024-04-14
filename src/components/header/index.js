import React from 'react'
import ABC from '../images/Abc.png';
// import bw from '../images/download.png';
import './styles.css';

export const Header = () => {
return(
  <div className="App">
      <header style={{display: "flex"}}>
      <img src={ABC} className="abc1"  alt="abc_logo"/>  
         {/* <img src={bw} className="head1" alt="main_logo"/>    */}
         
       </header>
       
       < div className="list">
     <h5><div className='title' style={{color:"white", marginLeft:"-10px"}}>INVOICE DETAILS </div></h5>
     </div>
       
  </div>
  )
}