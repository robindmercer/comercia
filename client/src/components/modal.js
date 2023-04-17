 import React from 'react'
 import '../css/modal.css'
 
 function modal({closeModal   }) {
   return (
     <div className='modalBack'>
        <div className='modalContainer'>
            <div className='modelCloseBtn'>
            <button onClick={()=> {closeModal(false)}} > X </button>
            </div>
            <div className='modalTitle'>
                <h1>Are you shure</h1>
            </div>
            <div className='modalBody'>
                <p>veamos que pasa</p>
            </div>
            <div className='modelFooter'>
                <button onClick={()=> {closeModal(false)}} id="cancelBtn">Cancel</button>&nbsp;
                <button>Continue</button>
            </div>
        </div>
     </div>
   )
 }
 
 export default modal;
 