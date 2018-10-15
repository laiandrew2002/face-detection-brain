import React from 'react'
import Tilt from 'react-tilt'
import AlekLogo from './alek-logo.png'

const Logo = () => {
  return (
    <div className='ma4 mt0' >
        <Tilt className="Tilt" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner logo shadow-4 br3"> 
        <img className='' src={AlekLogo} alt='logo' height='150px' width='150px'/>
        </div>
        </Tilt>
    </div>
  )
}

export default Logo;