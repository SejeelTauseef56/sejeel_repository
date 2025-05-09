import React from 'react'
import { footerInfo } from '../data/index'

const Footer = () => {
  return (
    <footer className="text-white py-6">
        <div className="container mx-auto text-center">
         <p className="text-sm">
           {footerInfo.text}
         </p>
        </div>
    </footer>
  )
}

export default Footer